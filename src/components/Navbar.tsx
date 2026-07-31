'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from '../data/content';
import Logo from './Logo';
import GlassNavbar from './GlassNavbar';
import GlassButton from './GlassButton';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusables = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Inset on all sides — the pane floats above the page rather than
            clamping to the viewport edge. */}
        <div className="page-shell py-5">
          <GlassNavbar>
            <a href="#top" onClick={close} className="text-white transition-opacity duration-300 hover:opacity-70">
              <Logo className="h-7 w-auto" />
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-white/70 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <GlassButton
                as="a"
                href="#contact"
                className="px-5 py-2 text-xs uppercase tracking-[0.22em]"
              >
                Contact
              </GlassButton>

              <button
                ref={triggerRef}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md transition hover:border-white/50 md:hidden"
              >
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                    menuOpen ? 'rotate-45' : '-translate-y-[5px]'
                  }`}
                />
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                    menuOpen ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                    menuOpen ? '-rotate-45' : 'translate-y-[5px]'
                  }`}
                />
              </button>
            </div>
          </GlassNavbar>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'rgba(0, 0, 0, 0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-0 px-8 pt-16">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="w-full border-b border-white/[0.08] py-6 text-center font-heading text-[1.6rem] font-medium tracking-wide text-white/85 transition-colors duration-200 active:text-white"
                >
                  {item.label}
                </a>
              ))}
              <GlassButton
                as="a"
                href="#contact"
                onClick={close}
                variant="primary"
                className="mt-10 px-10 py-3.5 text-sm uppercase tracking-[0.22em]"
              >
                Contact
              </GlassButton>
            </div>

            <div className="flex items-center justify-center gap-8 py-8 text-xs uppercase tracking-[0.22em] text-white/40">
              <a href="https://www.linkedin.com/in/kolansaiteja" onClick={close} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                LinkedIn
              </a>
              <a href="https://instagram.com/saitejakolan" onClick={close} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
