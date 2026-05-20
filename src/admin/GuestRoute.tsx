import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../lib/auth';

/** Redirect authenticated users away from login page */
export function GuestRoute({ children }: { children: React.ReactNode }) {
  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
