'use client';

import { useRef, type PointerEvent } from 'react';

type GlassTextProps = {
  /** Plain text — it is rendered four times to build the refraction stack. */
  children: string;
  className?: string;
};

/**
 * Wraps text in a glass lens that follows the cursor: the copy underneath is
 * magnified, split into cyan/amber fringes, and lit by a specular highlight.
 *
 * The pointer position is written straight to CSS custom properties rather
 * than React state — this fires on every mousemove, and re-rendering the tree
 * at that rate would drop frames.
 */
export default function GlassText({ children, className }: GlassTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const track = (event: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--lens-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--lens-y', `${event.clientY - rect.top}px`);
  };

  return (
    <span ref={ref} onPointerMove={track} className={`glass-text ${className ?? ''}`}>
      <span>{children}</span>

      <span className="glass-text__lens" aria-hidden="true">
        <span className="glass-text__ghost glass-text__ghost--red">{children}</span>
        <span className="glass-text__ghost glass-text__ghost--orange">{children}</span>
        <span className="glass-text__ghost glass-text__ghost--core">{children}</span>
      </span>

      <span className="glass-text__orb" aria-hidden="true" />
    </span>
  );
}
