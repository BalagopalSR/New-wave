import { Camera, Mail, MessageCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { useState, type FormEvent } from 'react';

const categories = ['Action', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Animation'];

export function Footer() {
  const [email, setEmail] = useState('');

  const handleMiniSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-cinematic-surface">
      <div className="section-pad mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-cinematic-muted">
              A cinematic destination for movie lovers to discover premieres, trailers,
              award-winning stories, and unforgettable film moments.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: MessageCircle, label: 'Social' },
                { Icon: Camera, label: 'Gallery' },
                { Icon: Mail, label: 'Email' },
                { Icon: Play, label: 'Videos' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cinematic-muted transition hover:border-cinematic-gold hover:text-cinematic-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-cinematic-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Movies', to: '/movies' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Awards', to: '/awards' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-cinematic-muted transition hover:text-cinematic-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-cinematic-gold">
              Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/movies?genre=${cat}`}
                    className="text-sm text-cinematic-muted transition hover:text-cinematic-gold"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-cinematic-gold">
              Stay Updated
            </h3>
            <form onSubmit={handleMiniSubmit} className="mt-4 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 rounded-full border border-white/15 bg-cinematic-bg px-4 py-2 text-sm focus:border-cinematic-gold focus:outline-none"
              />
              <button type="submit" className="btn-primary px-4 py-2 text-sm">
                Join
              </button>
            </form>
            <p className="mt-6 text-sm text-cinematic-muted">
              <a href="mailto:hello@newwave.com" className="hover:text-cinematic-gold">
                hello@newwave.com
              </a>
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-cinematic-muted">
          © {new Date().getFullYear()} New Wave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
