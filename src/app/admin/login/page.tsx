'use client';

import { Suspense } from 'react';
import { GuestRoute } from '../../../admin/GuestRoute';
import { AdminLoginPage } from '../../../admin/AdminLoginPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GuestRoute>
        <AdminLoginPage />
      </GuestRoute>
    </Suspense>
  );
}
