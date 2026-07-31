'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Framer's `useReducedMotion()` reads the media query on the client's *first*
 * render but always returns false on the server, so branching on it to pick
 * `initial`/`animate` values emits a different `style` attribute on each side
 * and trips React's hydration check for anyone with Reduce Motion enabled.
 *
 * `reducedMotion="user"` moves that decision inside Framer, which applies it
 * after mount: transform and layout animations are suppressed for those users
 * while opacity still fades, and the server and client agree on first paint.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
