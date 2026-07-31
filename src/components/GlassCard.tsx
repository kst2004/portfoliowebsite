'use client';

import { useRef, type ElementType, type PointerEvent, type ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Defaults to a div; pass 'article' / 'a' etc. to keep semantics intact. */
  as?: ElementType;
} & Record<string, unknown>;

/**
 * Surface wrapper for the liquid-glass hover: a specular sheen tracks the
 * cursor while the rim picks up a chromatic split. Styling lives in the
 * `.liquid-glass` rules; this only feeds the pointer position through, writing
 * to CSS variables directly so mousemove never triggers a re-render.
 */
export default function GlassCard({ children, className, as, ...rest }: GlassCardProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  const track = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--gx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--gy', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={track} className={`liquid-glass ${className ?? ''}`} {...rest}>
      {children}
    </Tag>
  );
}
