import { motion } from 'framer-motion';
import { Globe, Mail, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const CONTACT = {
  email: 'hello@newwave.com',
  phone: '+1 (800) 555-0199',
  website: 'https://www.newwave.com',
  websiteLabel: 'www.newwave.com',
};

const inputClass =
  'mt-1 w-full rounded-xl border border-white/15 bg-cinematic-bg px-4 py-3 text-sm focus:border-cinematic-gold focus:outline-none';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-hidden">
      <section className="relative flex min-h-[32vh] items-end pt-20 sm:min-h-[36vh]">
        <div
          className="absolute inset-0 bg-gradient-to-b from-cinematic-surface/80 to-cinematic-bg"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-8 pt-8 sm:px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Get in touch</p>
          <h1 className="mt-2 font-display text-3xl text-cinematic-ivory sm:text-4xl md:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-cinematic-muted sm:text-base">
            Questions about premieres, partnerships, or press? Send us a message — we&apos;ll get back
            to you soon.
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <aside className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-cinematic-gold">
              Contact details
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cinematic-gold/30 bg-cinematic-gold/10">
                  <Mail className="h-5 w-5 text-cinematic-gold" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-cinematic-muted">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 break-all text-sm text-cinematic-ivory hover:text-cinematic-gold sm:text-base"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cinematic-gold/30 bg-cinematic-gold/10">
                  <Phone className="h-5 w-5 text-cinematic-gold" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cinematic-muted">Phone</p>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s|[()]/g, '')}`}
                    className="mt-1 text-sm text-cinematic-ivory hover:text-cinematic-gold sm:text-base"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cinematic-gold/30 bg-cinematic-gold/10">
                  <Globe className="h-5 w-5 text-cinematic-gold" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-cinematic-muted">Website</p>
                  <a
                    href={CONTACT.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-cinematic-ivory hover:text-cinematic-gold sm:text-base"
                  >
                    {CONTACT.websiteLabel}
                  </a>
                </div>
              </li>
            </ul>
          </aside>

          <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-5 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-xl text-cinematic-ivory sm:text-2xl">Send a message</h2>
            {submitted ? (
              <p className="mt-6 rounded-xl border border-cinematic-gold/30 bg-cinematic-gold/10 p-4 text-sm text-cinematic-gold">
                Thank you! Your message has been received. We&apos;ll respond at the email you
                provided.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-cinematic-muted">Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-cinematic-muted">Email *</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm text-cinematic-muted">Subject</span>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-cinematic-muted">Message *</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={inputClass}
                  />
                </label>
                {error && <p className="text-sm text-cinematic-crimson">{error}</p>}
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
