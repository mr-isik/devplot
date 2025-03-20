'use client';

import { signin } from '@/actions/auth/actions';
import DynamicFormField, { FormFieldType } from '@/components/globals/DynamicFormField';
import Loader from '@/components/globals/Loader';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getSignInSchema, type SignInFormValues } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Auth');
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(getSignInSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    try {
      const response = await signin(values);

      if (response.error) {
        toast.error(response.error.message, {
          description: 'Please try again',
          duration: 5000,
        });
        return;
      }

      if (response.data) {
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        description: 'Please try again later',
      });
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t('welcome_back')}</h1>
        <p className="text-muted-foreground">{t('sign_in_description')}</p>
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

            <DynamicFormField
              control={form.control}
              name="password"
              label={t('password')}
              placeholder={t('password_placeholder')}
              fieldType={FormFieldType.PASSWORD}
              icon={<LockKeyhole className="size-4 text-muted-foreground" />}
            />

            <div className="flex items-center justify-end">
              <Button variant="link" className="px-0 text-sm font-normal text-primary">
                {t('forgot_password')}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            <Loader state={isLoading}>
              {isLoading ? t('signing_in') : t('sign_in')}
            </Loader>
          </Button>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center">
              <span className="mr-1 text-sm text-muted-foreground">{t('dont_have_account')}</span>
              <Link href="/sign-up">
                <Button variant="link" className="px-0 text-sm font-normal text-primary">
                  {t('sign_up')}
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
