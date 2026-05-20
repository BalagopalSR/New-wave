'use client';

import { Suspense } from 'react';
import { MoviesPage } from '../../../views/MoviesPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MoviesPage />
    </Suspense>
  );
}
