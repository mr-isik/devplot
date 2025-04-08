import { setRequestLocale } from 'next-intl/server';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute left-1/3 top-60 z-[-1] size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-1/2 top-32 z-[-1] size-[600px] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

      {props.children}
    </div>
  );
}
