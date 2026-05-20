import { Suspense, type ReactNode } from 'react';
import { PublicShell } from '../../components/layout/PublicShell';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<>{children}</>}><PublicShell>{children}</PublicShell></Suspense>;
}
