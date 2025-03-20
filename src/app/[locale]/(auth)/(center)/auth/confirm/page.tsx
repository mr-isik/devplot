import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AuthConfirmPage({ params, searchParams }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Verify' });

  const token = typeof searchParams.token === 'string' ? searchParams.token : null;
  const typeParam = typeof searchParams.type === 'string' ? searchParams.type : null;
  const type = typeParam as EmailOtpType | null;

  const supabase = createClient();

  if (!token || !type) {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">{t('error_occurred')}</h1>
        <p>{t('error_missing_parameters')}</p>
      </div>
    );
  }

  try {
    /* @ts-expect-error supabase.auth.verifyOtp is not typed */
    const { error } = await supabase.auth.verifyOtp({
      type,
      token,
      email: searchParams.email as string,
    });

    if (error) {
      return (
        <div className="p-4 text-center">
          <h1 className="mb-2 text-xl font-semibold">{t('error_occurred')}</h1>
          <p>{error.message}</p>
        </div>
      );
    }

    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">{t('verification_success')}</h1>
      </div>
    );
  } catch {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">{t('error_occurred')}</h1>
        <p>{t('unexpected_error')}</p>
      </div>
    );
  }
}
