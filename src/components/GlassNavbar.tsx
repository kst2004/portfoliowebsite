'use client';

import { useEffect, useState, type ReactNode } from 'react';
import LiquidGlass from './LiquidGlass';

type GlassNavbarProps = {
  children: ReactNode;
  /** Scroll distance before the pane materialises, in px. */
  threshold?: number;
};

/**
 * Floating navigation chrome.
 *
 * Two decisions worth naming:
 *
 * 1. The pane is inset from the viewport on every side rather than spanning
 *    edge to edge. A full-bleed bar reads as page furniture welded to the top;
 *    an inset pane with a contact shadow reads as suspended above the content,
 *    which is the whole point of the material.
 *
 * 2. At the top of the page the glass is absent, not merely transparent. Glass
 *    needs something behind it to refract — over an empty hero it just fogs a
 *    flat colour. It fades in once there is content to sit over.
 */
export default function GlassNavbar({ children, threshold = 24 }: GlassNavbarProps) {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  // One element throughout, with the material toggled by class. Swapping
  // between two different elements would remount the whole subtree on scroll,
  // dropping focus for anyone tabbing through the links at the time.
  return (
    <LiquidGlass
      as="nav"
      radius="capsule"
      refract
      className={`lg-nav flex items-center justify-between px-5 py-3 text-sm lg:px-7${
        lifted ? '' : ' lg-nav--bare'
      }`}
    >
      {children}
    </LiquidGlass>
  );
}
