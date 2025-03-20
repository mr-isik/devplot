import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  if (supabaseResponse.headers.has('location')) {
    return supabaseResponse;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
