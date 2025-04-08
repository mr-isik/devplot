import Logo from '@/components/globals/logo';
import SignUpForm from '@/features/auth/forms/SignUpForm';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage() {
  return (
    <div className="container relative flex min-h-[85vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="relative hidden h-full flex-col overflow-hidden rounded-r-3xl bg-muted p-10 text-white dark:border-r lg:flex"
      >
        <Image
          src="/signup_banner.png"
          alt="DevPlot SignUp Banner"
          fill
          className="absolute inset-0 z-10 object-cover"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo size={44} />
          <span className="text-2xl font-bold">DevPlot</span>
        </div>
        <div className="relative z-20 mt-auto rounded-lg bg-gradient-to-b from-black/50 to-black/80 p-4">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "DevPlot has completely transformed how I showcase my development work. It's intuitive, beautiful, and exactly what I needed for my portfolio."
            </p>
            <footer className="text-sm">Ömer Faruk Işık, Full-stack Developer</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo size={64} />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
