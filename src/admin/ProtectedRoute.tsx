import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '../lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
