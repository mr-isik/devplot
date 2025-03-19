import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { setRequestLocale } from 'next-intl/server';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container relative mx-auto overflow-x-hidden p-6">

        <div className="absolute left-72 top-60 z-[-1] size-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-72 top-32 z-[-1] size-[600px] rounded-full bg-red-600/10 blur-3xl" />
        {props.children}
      </main>
    </SidebarProvider>
  );
}
