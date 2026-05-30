'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItem = string | { src: string; playbackRate?: number };

type LightboxProps = {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
};

function LightboxVideo({ src, playbackRate = 1 }: { src: string; playbackRate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const handleCanPlay = () => {
    if (ref.current) ref.current.playbackRate = playbackRate;
  };
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls
      onCanPlay={handleCanPlay}
      style={{ maxHeight: '80svh', width: '100%', objectFit: 'contain', borderRadius: '12px' }}
    />
  );
}

export default function Lightbox({ items, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const prev = () => {
    if (current > 0) { setDirection(-1); setCurrent((c) => c - 1); }
  };
  const next = () => {
    if (current < items.length - 1) { setDirection(1); setCurrent((c) => c + 1); }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prev_overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev_overflow;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    // Only register horizontal swipes (not vertical scrolls)
    if (Math.abs(dx) > 48 && dy < 60) {
      if (dx > 0) next();
      else prev();
    }
  };

  const item = items[current];
  const isVideo = typeof item !== 'string';
  const src = typeof item === 'string' ? item : item.src;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-black/96"
      style={{ backdropFilter: 'blur(28px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/30">
          {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/60 transition hover:border-white/30 hover:text-white"
          aria-label="Close"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Media (takes remaining space) ── */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        // touch-action: pinch-zoom enables native browser pinch-to-zoom on the image
        style={{ touchAction: 'pinch-zoom' }}
        onClick={onClose}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            className="flex h-full w-full items-center justify-center px-2 sm:px-6"
            initial={{ opacity: 0, x: direction * 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -56 }}
            transition={{ duration: 0.28, ease: [0.2, 1, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <LightboxVideo src={src} playbackRate={typeof item !== 'string' ? item.playbackRate : 1} />
            ) : (
              /* Plain <img> — lets the browser handle native pinch-zoom correctly.
                 width/height: auto ensures the image sizes itself naturally.
                 max dimensions prevent it overflowing the viewport. */
              <img
                src={src}
                alt=""
                style={{
                  display: 'block',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '80svh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom nav ── */}
      <div className="shrink-0 px-4 pb-5 pt-3 sm:px-6">
        {items.length > 1 ? (
          <div className="flex items-center gap-4">
            {/* Prev */}
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/60 transition hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-20"
              aria-label="Previous"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex flex-1 items-center justify-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to item ${i + 1}`}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-accentGold' : 'w-3 bg-white/25 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              disabled={current === items.length - 1}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/60 transition hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-20"
              aria-label="Next"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        ) : (
          /* Single item — just a close hint */
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/20">
            tap outside to close
          </p>
        )}

        {/* Swipe hint — only shown on touch devices */}
        {items.length > 1 && (
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.26em] text-white/15 sm:hidden">
            swipe to navigate · pinch to zoom
          </p>
        )}
      </div>
    </motion.div>
  );
}
