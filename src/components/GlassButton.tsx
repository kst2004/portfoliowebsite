'use client';

import LiquidGlass, { type GlassOwnProps, type LiquidGlassProps } from './LiquidGlass';

type GlassButtonProps = Omit<LiquidGlassProps, keyof GlassOwnProps> &
  Pick<GlassOwnProps, 'as' | 'interactive' | 'refract'> & {
    /** Primary reads brighter through fill and border weight — never colour. */
    variant?: 'primary' | 'secondary';
  };

/**
 * A liquid glass capsule.
 *
 * Rendered as an <a> or <button> via `as`, so it stays a real control rather
 * than a clickable div.
 *
 * The specular is scoped tighter here than on cards (220px vs 460px, set in
 * glass.css): on a small target a wide gradient washes the whole surface flat,
 * where a tighter one keeps a readable hotspot that visibly moves under the
 * pointer.
 */
export default function GlassButton({
  children,
  className,
  variant = 'secondary',
  as = 'button',
  ...rest
}: GlassButtonProps) {
  const classes = [
    'lg-button',
    variant === 'primary' && 'lg-button--primary',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <LiquidGlass as={as} radius="capsule" interactive className={classes} {...rest}>
      {children}
    </LiquidGlass>
  );
}
