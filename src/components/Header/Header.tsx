import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollHeader } from '../../hooks/useScrollHeader';
import { useContent } from '../../context/ContentContext';
import { getSearchSuggestions } from '../../lib/movieUtils';
import { Logo } from '../Logo/Logo';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/awards', label: 'Awards' },
  { to: '/contact', label: 'Contact' },
];

type HeaderProps = {
  transparent?: boolean;
};

function isNavLinkActive(pathname: string, to: string, end?: boolean) {
  if (end) return pathname === to;
  if (to === '/movies') {
    return pathname === '/movies' || pathname.startsWith('/movies/');
  }
  return pathname === to;
}

export function Header({ transparent = false }: HeaderProps) {
  const scrolled = useScrollHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { movies } = useContent();
  const isHome = location.pathname === '/';
  const useTransparent = transparent && isHome && !scrolled;

  const suggestions = getSearchSuggestions(movies, query);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const goToSuggestion = (href: string) => {
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery('');
    navigate(href);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (highlightIndex >= 0 && suggestions[highlightIndex]) {
      goToSuggestion(suggestions[highlightIndex].href);
      return;
    }
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(q ? `/movies?q=${encodeURIComponent(q)}` : '/movies');
    setQuery('');
  };

  const navLinkClass = (active: boolean) =>
    `relative py-1 text-sm font-medium tracking-wide transition ${
      active ? 'text-cinematic-gold' : 'text-cinematic-muted hover:text-cinematic-text'
    } after:absolute after:bottom-0 after:left-0 after:h-px after:bg-cinematic-gold after:transition-all ${
      active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  const searchPanel = (
    <div className="relative" ref={searchRef}>
      <button
        type="button"
        onClick={() => setSearchOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cinematic-muted transition hover:border-cinematic-gold hover:text-cinematic-gold"
        aria-label="Search movies"
        aria-expanded={searchOpen}
      >
        <Search className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-12 z-50 w-80"
          >
            <form onSubmit={submitSearch}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHighlightIndex((i) => Math.max(i - 1, -1));
                  } else if (e.key === 'Escape') {
                    setSearchOpen(false);
                  }
                }}
                placeholder="Search movies, genres, directors..."
                autoFocus
                className="w-full rounded-t-2xl border border-white/15 bg-cinematic-surface px-4 py-2.5 text-sm shadow-card focus:border-cinematic-gold focus:outline-none"
              />
            </form>
            {query.trim().length >= 2 && (
              <ul className="max-h-64 overflow-y-auto rounded-b-2xl border border-t-0 border-white/15 bg-cinematic-surface shadow-card">
                {suggestions.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-cinematic-muted">No matches found.</li>
                ) : (
                  suggestions.map((s, i) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goToSuggestion(s.href)}
                        className={`flex w-full flex-col px-4 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                          i === highlightIndex ? 'bg-cinematic-gold/10 text-cinematic-gold' : ''
                        }`}
                      >
                        <span className="font-medium text-cinematic-ivory">{s.label}</span>
                        {s.subtitle && (
                          <span className="text-xs text-cinematic-muted">{s.subtitle}</span>
                        )}
                      </button>
                    </li>
                  ))
                )}
                <li className="border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/movies?q=${encodeURIComponent(query.trim())}`);
                      setSearchOpen(false);
                      setQuery('');
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs text-cinematic-gold hover:bg-white/5"
                  >
                    View all results for &quot;{query.trim()}&quot;
                  </button>
                </li>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 border-0 ${
        useTransparent ? 'header-over-hero bg-transparent' : 'glass-header'
      }`}
    >
      <div className="mx-auto flex min-h-[4.5rem] max-w-[1440px] items-center justify-between gap-2 px-4 py-2 sm:min-h-20 sm:px-6 lg:gap-6 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isNavLinkActive(location.pathname, link.to, link.end);
            return (
              <Link key={link.to} to={link.to} className={navLinkClass(active)}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:flex">{searchPanel}</div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-cinematic-bg/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <form onSubmit={submitSearch} className="mb-3 flex gap-2">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="flex-1 rounded-full border border-white/15 bg-cinematic-surface px-4 py-2 text-sm"
                />
                <button type="submit" className="btn-primary px-4 py-2 text-sm">
                  Go
                </button>
              </form>
              {query.trim().length >= 2 && suggestions.length > 0 && (
                <ul className="mb-3 rounded-xl border border-white/10 bg-cinematic-surface">
                  {suggestions.slice(0, 5).map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goToSuggestion(s.href)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-white/5"
                      >
                        {s.label}
                        {s.subtitle && (
                          <span className="ml-2 text-xs text-cinematic-muted">{s.subtitle}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {navLinks.map((link) => {
                const active = isNavLinkActive(location.pathname, link.to, link.end);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={navLinkClass(active)}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
