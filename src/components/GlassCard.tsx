'use client';

import LiquidGlass, { type LiquidGlassProps } from './LiquidGlass';

type GlassCardProps = LiquidGlassProps;

/**
 * A glass sheet for content.
 *
 * Interactive by default — a card the pointer can reach should respond to it.
 * Pass `interactive={false}` for purely presentational panels so they do not
 * lift under a cursor that is only passing through.
 *
 * `depth` exists because stacked glass has to differ: two sheets sharing a
 * tint merge into one slab and the sense of layering collapses. Outer surfaces
 * take depth 1, anything nested inside them steps to 2 or 3.
 */
export default function GlassCard({
  children,
  className,
  depth = 1,
  interactive = true,
  ...rest
}: GlassCardProps) {
  return (
    <LiquidGlass depth={depth} interactive={interactive} className={className} {...rest}>
      {children}
    </LiquidGlass>
  );
}
