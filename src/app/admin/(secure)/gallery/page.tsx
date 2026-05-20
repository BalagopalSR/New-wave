'use client';

import { Suspense } from 'react';
import { AdminGalleryPage } from '../../../../admin/AdminGalleryPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminGalleryPage />
    </Suspense>
  );
}
