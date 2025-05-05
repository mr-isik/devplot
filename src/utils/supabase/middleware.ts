import { checkDomain } from "@/actions/tenants/actions";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/logout"];
const authRoutes = ["/sign-in", "/sign-up", "/verify", "/auth/confirm"];

export async function updateSession(request: NextRequest) {
  console.log("🔍 Middleware started for path:", request.nextUrl.pathname);
  console.log("🌐 Full URL:", request.url);
  console.log("🏠 Host:", request.headers.get("host"));

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.cookies.getAll();
          return cookies;
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    protectedRoutes.includes(request.nextUrl.pathname) &&
    request.nextUrl.pathname !== "/"
  ) {
    console.log("🚫 Access denied - redirecting to sign-in");
    const signInUrl = new URL(`/sign-in`, request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    console.log(
      "✅ Authenticated user accessing auth route - redirecting to dashboard"
    );
    const dashboardUrl = new URL(`/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  const host = request.headers.get("host") || "";
  console.log("🏠 Checking host:", host);
  console.log("🌐 Expected domain:", process.env.NEXT_PUBLIC_DOMAIN);

  if (
    host === `www.${process.env.NEXT_PUBLIC_DOMAIN}` ||
    host === "localhost:3000"
  ) {
    console.log("✅ Valid host - proceeding");
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname === "/" &&
    host !== `www.${process.env.NEXT_PUBLIC_DOMAIN}`
  ) {
    console.log("🔍 Checking domain existence for:", host);
    const isDomainExist = await checkDomain(host);
    console.log("🏢 Domain check result:", isDomainExist);

    if (isDomainExist.error || !isDomainExist.data) {
      console.log("🚫 Domain does not exist - redirecting to home");
      const homeUrl = new URL(`/`, request.url);
      return NextResponse.redirect(homeUrl);
    }

    const tenantId = isDomainExist.data.id;
    console.log("🏢 Tenant ID:", tenantId);

    const url = request.nextUrl.clone();
    url.pathname = `/${tenantId}${url.pathname}`;
    console.log("🔄 Rewriting URL to:", url.pathname);
    return NextResponse.rewrite(url);
  }

  console.log("✅ Middleware completed successfully");
  return NextResponse.next();
}
