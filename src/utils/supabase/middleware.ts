import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user
    && !request.nextUrl.pathname.startsWith('/sign-in')
    && !request.nextUrl.pathname.startsWith('/sign-up')
    && !request.nextUrl.pathname.startsWith('/auth/confirm')
    && !request.nextUrl.pathname.startsWith('/verify')
    && request.nextUrl.pathname !== '/'
  ) {
    const locale
          = request.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

    const signInUrl = new URL(`${locale}/sign-in`, request.url);
    return NextResponse.redirect(signInUrl);
  }

  return supabaseResponse;
}
