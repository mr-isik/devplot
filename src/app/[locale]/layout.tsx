import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import arcjet, { detectBot, request } from '@/libs/Arcjet';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import Providers from '@/providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: '/devplot_logo.ico',
      sizes: '32x32',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE',
      'CATEGORY:PREVIEW',
      'CATEGORY:MONITOR',
    ],
  }),
);

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error('No bots allowed');
      }

      throw new Error('Access denied');
    }
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            {props.children}
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
