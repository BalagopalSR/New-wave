import { Lock, User } from 'lucide-react';
import { Logo } from '../components/Logo/Logo';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  setAdminSession,
  validateAdminCredentials,
} from '../lib/auth';

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim()) {
      setError('Please enter your username.');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      setLoading(false);
      return;
    }

    if (validateAdminCredentials(username, password)) {
      setAdminSession(username.trim());
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cinematic-bg px-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/w1280/nMKdUUEPR25pcRom6Kx0qgx0QK.jpg)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-bg via-cinematic-bg/90 to-cinematic-bg" />

      <div className="relative w-full max-w-md rounded-3xl border border-cinematic-gold/25 bg-cinematic-surface/95 p-8 shadow-gold backdrop-blur-xl">
        <div>
          <Logo to="/" />
          <p className="mt-2 text-xs uppercase tracking-widest text-cinematic-muted">Admin Portal</p>
        </div>

        <h1 className="mt-8 font-display text-2xl text-cinematic-ivory">Sign in to continue</h1>
        <p className="mt-2 text-sm text-cinematic-muted">
          Authentication is required to manage movies, hero banners, and site content.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="admin-username" className="text-sm text-cinematic-muted">
              Username
            </label>
            <div className="relative mt-1">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cinematic-muted" />
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                autoComplete="username"
                className="w-full rounded-xl border border-white/15 bg-cinematic-bg py-3 pl-11 pr-4 focus:border-cinematic-gold focus:outline-none focus:ring-1 focus:ring-cinematic-gold"
                placeholder={ADMIN_USERNAME}
              />
            </div>
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm text-cinematic-muted">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cinematic-muted" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/15 bg-cinematic-bg py-3 pl-11 pr-4 focus:border-cinematic-gold focus:outline-none focus:ring-1 focus:ring-cinematic-gold"
              />
            </div>
          </div>
          {error && (
            <p
              className="rounded-lg bg-cinematic-crimson/10 px-4 py-2 text-sm text-cinematic-crimson"
              role="alert"
            >
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-cinematic-muted">
          Demo: <code className="text-cinematic-gold">{ADMIN_USERNAME}</code> /{' '}
          <code className="text-cinematic-gold">{ADMIN_PASSWORD}</code>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-cinematic-muted hover:text-cinematic-gold">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
