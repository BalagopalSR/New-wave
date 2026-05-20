'use client';

import { Suspense, type ReactNode } from 'react';
import { ContentProvider } from '../context/ContentContext';
import { ThemeProvider } from '../context/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Suspense fallback={null}>{children}</Suspense>
      </ContentProvider>
    </ThemeProvider>
  );
}
