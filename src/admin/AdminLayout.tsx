import { Clapperboard, Images, LayoutDashboard, Film, Image, LogOut, Home } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAdminSession } from '../lib/auth';
import { Logo } from '../components/Logo/Logo';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/movies', label: 'Movies', icon: Film },
  { to: '/admin/clips', label: 'Trailers & Clips', icon: Clapperboard },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/banners', label: 'Hero Banners', icon: Image },
];

export function AdminLayout() {
  return <AdminLayoutInner />;
}

export function AdminLayoutInner({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();

  const logout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-cinematic-bg text-cinematic-text">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-cinematic-surface p-6 lg:block">
        <div>
          <Logo to="/admin" />
          <span className="mt-2 block text-xs font-sans uppercase tracking-widest text-cinematic-muted">
            Admin
          </span>
        </div>
        <nav className="mt-10 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-cinematic-gold/15 text-cinematic-gold'
                    : 'text-cinematic-muted hover:bg-white/5 hover:text-cinematic-text'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-2 pt-10">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-cinematic-muted hover:text-cinematic-gold"
          >
            <Home className="h-5 w-5" /> View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-cinematic-crimson hover:bg-cinematic-crimson/10"
          >
            <LogOut className="h-5 w-5" /> Log out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 lg:px-8">
          <nav className="flex gap-2 lg:hidden">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="rounded-lg px-3 py-2 text-xs text-cinematic-muted hover:text-cinematic-gold"
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <p className="hidden text-sm text-cinematic-muted lg:block">Content Management</p>
          <button type="button" onClick={logout} className="text-sm text-cinematic-crimson lg:hidden">
            Log out
          </button>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
