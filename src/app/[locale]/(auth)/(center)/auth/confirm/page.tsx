import type { EmailOtpType } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VerifyEmail from './VerifyEmail';

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Verify' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AuthConfirmPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Verify' });

  const { token_hash, type, error_code, error_message, next } = await searchParams;

  if (!token_hash) {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">{t('error_occurred')}</h1>
        <p>{t('error_missing_parameters')}</p>
      </div>
    );
  }

  if (error_code === 'otp_expired') {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">
          {t('error_occurred')}
        </h1>
        <p>{error_message}</p>
      </div>
    );
  }

  return (
    <VerifyEmail
      token_hash={token_hash as string}
      type={type as EmailOtpType}
      next={next as string}
      translations={{
        error_occurred: t('error_occurred'),
        unexpected_error: t('unexpected_error'),
        verification_success: t('verification_success'),
        verifying: t('verifying'),
      }}
    />
  );
}
