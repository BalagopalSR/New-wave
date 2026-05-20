'use client';

import { Suspense, type ReactNode } from 'react';
import { ProtectedRoute } from '../../../admin/ProtectedRoute';
import { AdminLayoutInner } from '../../../admin/AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ProtectedRoute>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </ProtectedRoute>
    </Suspense>
  );
}
