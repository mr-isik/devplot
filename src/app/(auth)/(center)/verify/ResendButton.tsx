'use client';

import { resendEmail } from '@/actions/auth/actions';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  email: string;
};

const ResendButton = ({ email }: Props) => {
  const t = useTranslations('Verify');
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await resendEmail(email);
      if (error || !data) {
        toast.error(t('email_not_sent'));
      } else {
        toast.success(t('email_sent'));
      }
    } catch (error) {
      toast.error(t('unexpected_error'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handleResendEmail}
      disabled={isLoading}
    >
      <Loader state={isLoading}>
        {t('resend_email')}
      </Loader>
    </Button>
  );
};

export default ResendButton;
