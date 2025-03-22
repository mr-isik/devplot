'use client';

import { resetPassword } from '@/actions/auth/actions';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getResetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const t = useTranslations('ResetPassword');

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(getResetPasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await resetPassword(values.email);
      if (error) {
        toast.error(t('validation.email_required'));
      } else if (data) {
        setLinkSent(true);
      } else {
        toast.error('surprise motherfucker!');
      }
    } catch (error) {
      console.error(error);
      toast.error(t('validation.email_required'));
    } finally {
      setIsLoading(false);
    }
  };

  if (linkSent) {
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">{t('reset_password_success')}</h1>
          <p className="text-muted-foreground">{t('reset_password_success_description')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t('reset_password')}</h1>
        <p className="text-muted-foreground">{t('reset_password_description')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

            <DynamicFormField
              control={form.control}
              name="email"
              label={t('email')}
              placeholder={t('email_placeholder')}
              fieldType={FormFieldType.INPUT}
              icon={<Mail className="size-4 text-muted-foreground" />}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            <Loader state={isLoading}>
              {isLoading ? t('resetting_password') : t('reset_password')}
            </Loader>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
