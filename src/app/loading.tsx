import { useTranslations } from 'next-intl';
import React from 'react';

const Loading = () => {
  const t = useTranslations('Loading');

  return (
    <html lang="en">
      <body className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="relative">
          <div className="size-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />

          <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/10" />
        </div>

        <h2 className="mt-8 animate-pulse text-xl font-medium text-foreground">
          {t('loading')}
          <span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce delay-100">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
        </h2>
      </body>
    </html>
  );
};

export default Loading;
