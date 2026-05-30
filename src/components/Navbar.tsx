'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="page-shell py-5">
          <nav
            className={`flex items-center justify-between rounded-full px-5 py-3 text-sm transition duration-700 lg:px-7 ${
              scrolled
                ? 'border border-white/15 bg-white/[0.08] shadow-soft backdrop-blur-2xl'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <a href="#top" onClick={close} className="font-heading text-base tracking-[0.18em] text-accentSoft">
              SK
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-accentSoft/75 transition hover:text-accentGold">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="#contact" className="glass-button px-5 py-2 text-xs uppercase tracking-[0.22em]">
                Contact
              </a>

              {/* Hamburger — absolute-positioned spans so transforms are exact */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md transition hover:border-accentGold/40 md:hidden"
              >
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-accentSoft transition-all duration-300 ease-in-out ${
                    menuOpen ? 'rotate-45' : '-translate-y-[5px]'
                  }`}
                />
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-accentSoft transition-all duration-300 ease-in-out ${
                    menuOpen ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute block h-[1.5px] w-[18px] origin-center rounded-full bg-accentSoft transition-all duration-300 ease-in-out ${
                    menuOpen ? '-rotate-45' : 'translate-y-[5px]'
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen overlay — no nested framer-motion on items */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'rgba(12, 15, 20, 0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-0 px-8 pt-16">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="w-full border-b border-white/[0.08] py-6 text-center font-heading text-[1.6rem] font-medium tracking-wide text-white/85 transition-colors duration-200 active:text-accentGold"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={close}
                className="mt-10 inline-flex items-center justify-center rounded-full border border-accentGold/50 bg-accentGold/10 px-10 py-3.5 text-sm uppercase tracking-[0.22em] text-accentSoft transition hover:bg-accentGold/20"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 py-8 text-xs uppercase tracking-[0.22em] text-white/40">
              <a href="https://www.linkedin.com/in/kolansaiteja/" onClick={close} className="transition hover:text-accentGold">
                LinkedIn
              </a>
              <a href="https://instagram.com/saitejakolan" onClick={close} className="transition hover:text-accentGold">
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
