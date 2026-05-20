'use client';

import { Suspense } from 'react';
import { AdminClipsPage } from '../../../../admin/AdminClipsPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminClipsPage />
    </Suspense>
  );
}
