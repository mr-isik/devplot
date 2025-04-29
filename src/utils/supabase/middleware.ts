import { checkDomain } from "@/actions/tenants/actions";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/logout"];
const authRoutes = ["/sign-in", "/sign-up", "/verify", "/auth/confirm"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
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
    const signInUrl = new URL(`/sign-in`, request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    const dashboardUrl = new URL(`/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  const host = request.headers.get("host") || "";

  if (host === process.env.NEXT_PUBLIC_DOMAIN || host === "localhost:3000") {
    return supabaseResponse;
  }

  const isDomainExist = await checkDomain(host);

  if (isDomainExist.error) {
    const url = request.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  const tenantId = isDomainExist.data.id;

  const url = request.nextUrl.clone();
  url.pathname = `/${tenantId}${url.pathname}`;
  return NextResponse.rewrite(url);

  return supabaseResponse;
}
