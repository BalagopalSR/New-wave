'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <Header transparent={isHome} />
      {children}
      <Footer />
    </>
  );
}
