import { getTranslations } from 'next-intl/server';
import DashboardClient from './DashboardClient';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Dashboard() {
  return <DashboardClient />;
}
