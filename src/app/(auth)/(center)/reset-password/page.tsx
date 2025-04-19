import ResetPasswordForm from '@/features/auth/forms/ResetPasswordForm';
import { getTranslations } from 'next-intl/server';

type ResetPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ResetPasswordPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ResetPassword' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
