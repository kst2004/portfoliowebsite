'use client';

import { useEffect, useState } from 'react';
import { navItems } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="page-shell py-5">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-3 text-sm transition duration-700 lg:px-7 ${
            scrolled
              ? 'border border-white/15 bg-white/[0.08] shadow-soft backdrop-blur-2xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="font-heading text-base tracking-[0.18em] text-accentSoft">
            SK
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-accentSoft/75 transition hover:text-accentGold">
                {item.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="glass-button px-5 py-2 text-xs uppercase tracking-[0.22em]">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
