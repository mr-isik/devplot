'use client';

import { updatePassword } from '@/actions/auth/actions';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getUpdatePasswordSchema, type UpdatePasswordFormValues } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('UpdatePassword');
  const router = useRouter();

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(getUpdatePasswordSchema(t)),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: UpdatePasswordFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await updatePassword(values.password);

      if (error) {
        toast.error(error.message, {
          description: 'Please try again',
          duration: 5000,
        });
      } else if (data) {
        toast.success(t('update_password_success'), {
          description: t('update_password_success_description'),
          duration: 5000,
        });
        router.push(`/sign-in`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        description: 'Please try again later',
      });
      console.error('Update password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t('update_password')}</h1>
        <p className="text-muted-foreground">{t('update_password_description')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">

            <DynamicFormField
              control={form.control}
              name="password"
              label={t('password')}
              placeholder={t('password_placeholder')}
              fieldType={FormFieldType.PASSWORD}
            />

            <DynamicFormField
              control={form.control}
              name="confirmPassword"
              label={t('confirm_password')}
              placeholder={t('confirm_password_placeholder')}
              fieldType={FormFieldType.PASSWORD}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={isLoading}
          >
            <Loader state={isLoading}>
              {isLoading ? t('updating_password') : t('update_password')}
            </Loader>
          </Button>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center">
              <Link href="/sign-in">
                <Button variant="link" className="px-0 text-sm font-normal text-primary">
                  {t('return_to_signin')}
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
