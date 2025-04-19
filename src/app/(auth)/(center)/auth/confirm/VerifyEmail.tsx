"use client";

import type { EmailOtpType } from "@supabase/supabase-js";
import { verifyEmail } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type VerifyEmailProps = {
  token_hash: string;
  type: EmailOtpType;
  next: string;
  translations: {
    error_occurred: string;
    unexpected_error: string;
    verification_success: string;
    verifying: string;
  };
};

export default function VerifyEmail({
  token_hash,
  type,
  next,
  translations,
}: VerifyEmailProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        setIsLoading(true);
        const { error } = await verifyEmail(token_hash, type);

        if (error !== null) {
          setError(error.message);
        } else {
          router.push(next || "/dashboard");
        }
      } catch {
        setError(translations.unexpected_error);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [token_hash, type, router, translations.unexpected_error, next]);

  let content;
  if (isLoading) {
    content = (
      <div className="p-4 text-center">
        <div className="mx-auto mb-2 size-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
        <p>{translations.verifying}</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">
          {translations.error_occurred}
        </h1>
        <p>{error}</p>
      </div>
    );
  } else {
    content = (
      <div className="p-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">
          {translations.verification_success}
        </h1>
      </div>
    );
  }

  return <div className="w-full max-w-md px-4">{content}</div>;
}
