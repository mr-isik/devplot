import UpdatePasswordForm from '@/features/auth/forms/UpdatePasswordForm';
import { getTranslations } from 'next-intl/server';

type ChangePasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ChangePasswordPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'UpdatePassword' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ChangePasswordPage = () => {
  return <UpdatePasswordForm />;
};

export default ChangePasswordPage;
