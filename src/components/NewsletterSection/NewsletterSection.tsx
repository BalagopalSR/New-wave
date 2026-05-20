import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSuccess(true);
    setEmail('');
  };

  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://picsum.photos/seed/cv-newsletter/1920/1080)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-cinematic-bg/85" aria-hidden />
      <div className="absolute inset-0 bg-spotlight-radial" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-2xl rounded-3xl border border-cinematic-gold/30 bg-cinematic-surface/80 p-8 backdrop-blur-xl md:p-12"
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-cinematic-gold">
          Newsletter
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-cinematic-ivory md:text-4xl">
          Stay in the Spotlight
        </h2>
        <p className="mt-4 text-center text-cinematic-muted">
          Get the latest movie releases, trailers, festival news, exclusive interviews, and award
          updates delivered to your inbox.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex flex-col items-center gap-3 text-center"
          >
            <CheckCircle className="h-12 w-12 text-cinematic-gold" />
            <p className="text-lg text-cinematic-ivory">You&apos;re on the list!</p>
            <p className="text-sm text-cinematic-muted">Thank you for subscribing to New Wave.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cinematic-muted" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/15 bg-cinematic-bg/50 py-3.5 pl-12 pr-4 text-cinematic-text placeholder:text-cinematic-muted focus:border-cinematic-gold focus:outline-none focus:ring-1 focus:ring-cinematic-gold"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-cinematic-crimson" role="alert">
                  {error}
                </p>
              )}
            </div>
            <button type="submit" className="btn-primary shrink-0 sm:px-8">
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
