import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { checkDomain } from "./actions/tenants/actions";

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  return supabaseResponse;

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
}

export const config = {
  matcher: [
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
