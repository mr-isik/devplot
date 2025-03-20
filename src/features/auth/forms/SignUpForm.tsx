'use client';

import { signup } from '@/actions/auth/actions';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getSignUpSchema, type SignUpFormValues } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Auth');

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(getSignUpSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    try {
      const response = await signup(values);

      if (response.error) {
        toast.error(response.error.message, {
          description: 'Please try again',
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        description: 'Please try again later',
      });
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t('create_account')}</h1>
        <p className="text-muted-foreground">{t('sign_up_description')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <DynamicFormField
              control={form.control}
              name="email"
              label={t('email')}
              placeholder={t('email_placeholder')}
              fieldType={FormFieldType.INPUT}
            />

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

            <div className="space-y-2">
              <DynamicFormField
                control={form.control}
                name="terms"
                fieldType={FormFieldType.CHECKBOX}
                label={(
                  <span className="text-sm">
                    {t('terms')}
                    ,
                    <br />
                    <Link href="#" className="text-primary hover:underline">{t('terms_link')}</Link>
                    {' '}
                    &
                    {' '}
                    <Link href="#" className="text-primary hover:underline">{t('privacy_link')}</Link>
                  </span>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full"
            disabled={isLoading}
          >
            <Loader state={isLoading}>
              {isLoading ? t('signing_up') : t('sign_up')}
            </Loader>
          </Button>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center">
              <span className="mr-1 text-sm text-muted-foreground">{t('already_have_account')}</span>
              <Link href="/sign-in">
                <Button variant="link" className="px-0 text-sm font-normal text-primary">
                  {t('sign_in')}
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
