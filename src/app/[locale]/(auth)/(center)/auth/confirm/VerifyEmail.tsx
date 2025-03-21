'use client';

import type { EmailOtpType } from '@supabase/supabase-js';
import { verifyEmail } from '@/actions/auth/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type VerifyEmailProps = {
  token_hash: string;
  type: EmailOtpType;
  translations: {
    error_occurred: string;
    unexpected_error: string;
    verification_success: string;
    verifying: string;
  };
};

export default function VerifyEmail({ token_hash, type, translations }: VerifyEmailProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        setIsLoading(true);
        const { error } = await verifyEmail(token_hash, type);

        if (error !== null) {
          setError(error.message);
        } else {
          router.push('/dashboard');
        }
      } catch {
        setError(translations.unexpected_error);
      } finally {
        setIsLoading(false);
      }
    }

    verify();
  }, [token_hash, type, router, translations.unexpected_error]);

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="mx-auto mb-2 size-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
        <p>{translations.verifying}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">
          {translations.error_occurred}
        </h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h1 className="mb-2 text-xl font-semibold">{translations.verification_success}</h1>
    </div>
  );
}
