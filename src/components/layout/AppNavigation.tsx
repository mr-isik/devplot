'use client';

import Link from 'next/link';
import Logo from '../globals/logo';
import { UserButton } from '../globals/UserButton';

export function AppNavigation() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border">
      <Link href="/dashboard" className="inline-flex items-center">
        <Logo size={52} />
        <h1 className="font-bold">DevPlot</h1>
      </Link>

      <div className="flex items-center">
        <UserButton />
      </div>
    </nav>
  );
}
