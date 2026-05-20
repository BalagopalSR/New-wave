import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import {
  buildEmbedPlayerSrc,
  isDirectVideoFile,
  toYouTubeEmbedUrl,
} from '../../lib/videoUrl';

export type VideoNotice = {
  title: string;
  body: string;
};

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  movieTitle?: string;
  clipTitle?: string;
  duration?: string;
  notice?: VideoNotice;
};

export function VideoModal({
  isOpen,
  onClose,
  videoUrl = '',
  movieTitle,
  clipTitle,
  duration,
  notice,
}: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const embedSrc = useMemo(() => {
    if (!isOpen || notice) return null;
    const embed = toYouTubeEmbedUrl(videoUrl);
    return embed ? buildEmbedPlayerSrc(embed) : null;
  }, [videoUrl, isOpen, notice]);

  const isFile = !notice && isDirectVideoFile(videoUrl);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          role="dialog"
          aria-modal="true"
          aria-label={notice?.title ?? clipTitle ?? 'Video player'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={(e) => {
            if (e.target === backdropRef.current) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-cinematic-gold hover:text-cinematic-gold"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {notice ? (
              <motion.div className="rounded-2xl border border-white/10 bg-cinematic-surface p-8 text-center shadow-card sm:p-12">
                <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">{movieTitle}</p>
                <h3 className="mt-3 font-display text-2xl text-cinematic-ivory sm:text-3xl">
                  {notice.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cinematic-muted sm:text-base">
                  {notice.body}
                </p>
                <button type="button" onClick={onClose} className="btn-primary mt-8">
                  Got it
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-cinematic-surface shadow-card">
                  {embedSrc ? (
                    <iframe
                      key={embedSrc}
                      src={embedSrc}
                      title={clipTitle ?? movieTitle ?? 'Video'}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : isFile ? (
                    <video
                      key={videoUrl}
                      src={videoUrl}
                      controls
                      autoPlay
                      className="h-full w-full bg-black"
                      playsInline
                    />
                  ) : (
                    <motion.div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                      <p className="text-sm text-cinematic-muted">
                        This link cannot be embedded. Use a YouTube embed URL in admin, or open the
                        video in a new tab.
                      </p>
                      {videoUrl.trim() && (
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open video
                        </a>
                      )}
                    </motion.div>
                  )}
                </motion.div>
                <motion.div className="mt-4 text-center md:text-left">
                  {movieTitle && (
                    <p className="text-sm uppercase tracking-wider text-cinematic-gold">{movieTitle}</p>
                  )}
                  {clipTitle && (
                    <h3 className="font-display text-xl text-cinematic-ivory">{clipTitle}</h3>
                  )}
                  {duration && <p className="mt-1 text-sm text-cinematic-muted">{duration}</p>}
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
