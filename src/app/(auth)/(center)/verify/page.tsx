import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ResendButton from './ResendButton';

type Props = {
  params: { locale: string };
  searchParams: { email: string };
};

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address to continue your journey.',
};

export default async function VerifyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { email } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Verify' });

  if (!email) {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">{t('error_occurred')}</h1>
        <p>{t('error_missing_parameters')}</p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-md px-4"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{t('check_inbox')}</p>
              </div>
            </div>
            <p className="pl-11 text-xs text-muted-foreground">
              {t('check_spam')}
            </p>
          </div>

        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <ResendButton email={email} />

          <Button
            variant="outline"
            asChild
            className="w-full"
          >
            <Link href="/sign-in">
              {t('back_to_signin')}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
