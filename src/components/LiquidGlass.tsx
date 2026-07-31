'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type PointerEvent,
} from 'react';

/** The glass-specific props, kept separate from the DOM props so derived
 *  components can Omit/Pick from them without an index signature swallowing
 *  the named types. */
export type GlassOwnProps = {
  /** Renders a div by default; pass 'article', 'a', 'nav', 'button' to keep semantics. */
  as?: ElementType;
  /** Sheet ordering. Nested glass must step down or the stack reads as one slab. */
  depth?: 1 | 2 | 3;
  /** Corner treatment. */
  radius?: 'default' | 'sm' | 'capsule';
  /** Lift + brighten on hover. Off for passive surfaces. */
  interactive?: boolean;
  /** Opt in to the SVG displacement filter — costly, so hero surfaces only. */
  refract?: boolean;
};

/** Anchor props, since `as="a"` is a common case for cards and buttons. */
type AnchorProps = {
  href?: string;
  target?: string;
  rel?: string;
};

export type LiquidGlassProps = GlassOwnProps & HTMLAttributes<HTMLElement> & AnchorProps;

/** How far the highlight travels toward the pointer each frame (0-1).
 *  Low value = heavy, viscous lag. This is what makes the light feel like it
 *  has mass rather than being glued to the cursor. */
const TRACKING_LERP = 0.12;

/** Stop the rAF loop once the highlight is within this many px of the pointer. */
const SETTLE_EPSILON = 0.4;

/**
 * The glass primitive every other glass component builds on.
 *
 * Two implementation notes that matter:
 *
 * 1. Pointer position is written to CSS custom properties through a ref, never
 *    React state. Pointermove fires at display rate; re-rendering the subtree
 *    that often would drop frames on exactly the interaction meant to feel
 *    smooth.
 *
 * 2. The highlight is interpolated toward the pointer on requestAnimationFrame
 *    instead of being assigned directly. A specular that tracks the cursor
 *    1:1 reads as a cheap CSS trick; one that eases behind it reads as a
 *    reflection with weight. The loop is only alive while the two are apart,
 *    so an idle card costs nothing.
 */
export default function LiquidGlass({
  children,
  className,
  as,
  depth = 1,
  radius = 'default',
  interactive = false,
  refract = false,
  ...rest
}: LiquidGlassProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  // Live pointer target and the eased position actually painted.
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const primed = useRef(false);

  const stop = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, []);

  /** Writes the highlight position and the aberration bias vector together.
   *  The bias is the pointer's offset from centre, normalised and clamped to
   *  ±1, so the chromatic fringe favours the side the light is coming from —
   *  the same way the fringe in a real lens shifts with viewing angle. */
  const paint = useCallback((el: HTMLElement, x: number, y: number) => {
    el.style.setProperty('--lg-x', `${x}px`);
    el.style.setProperty('--lg-y', `${y}px`);

    const { width, height } = el.getBoundingClientRect();
    if (width && height) {
      const ax = Math.max(-1, Math.min(1, (x / width) * 2 - 1));
      const ay = Math.max(-1, Math.min(1, (y / height) * 2 - 1));
      el.style.setProperty('--lg-ax', ax.toFixed(3));
      el.style.setProperty('--lg-ay', ay.toFixed(3));
    }
  }, []);

  const step = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;

    if (Math.abs(dx) < SETTLE_EPSILON && Math.abs(dy) < SETTLE_EPSILON) {
      current.current = { ...target.current };
      frame.current = null;
      return;
    }

    current.current.x += dx * TRACKING_LERP;
    current.current.y += dy * TRACKING_LERP;

    paint(el, current.current.x, current.current.y);

    frame.current = requestAnimationFrame(step);
  }, [paint]);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      // Touch and pen also emit pointermove — during a scroll, every finger
      // drag over a card would start a rAF loop measuring layout, on exactly
      // the interaction that most needs a free main thread. None of the
      // effects this drives are reachable without hover, so ignore them.
      if (event.pointerType !== 'mouse') return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      target.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      // On the first move, jump the highlight to the pointer rather than
      // sliding it in from the top-left corner of the element.
      if (!primed.current) {
        primed.current = true;
        current.current = { ...target.current };
        paint(el, current.current.x, current.current.y);
        return;
      }

      if (frame.current === null) frame.current = requestAnimationFrame(step);
    },
    [step, paint],
  );

  const onPointerLeave = useCallback(() => {
    primed.current = false;
    stop();
  }, [stop]);

  useEffect(() => stop, [stop]);

  const classes = [
    'lg',
    depth === 2 && 'lg--depth-2',
    depth === 3 && 'lg--depth-3',
    radius === 'sm' && 'lg--radius-sm',
    radius === 'capsule' && 'lg--capsule',
    interactive && 'lg--interactive',
    refract && 'lg--refract',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {children}

      {/* Layers 4-6. Rendered after children because light on a pane sits above
          whatever is behind it — see the stacking note in glass.css. The
          specular (7) and chromatic edge (8) are ::before/::after on the host,
          so they need no nodes of their own. */}
      <span className="lg__reflect" aria-hidden="true" />
      <span className="lg__fresnel" aria-hidden="true" />
      <span className="lg__noise" aria-hidden="true" />
    </Tag>
  );
}

/**
 * SVG filters for the glass optics. Mounted once per document, in the layout.
 *
 * `#lg-chromatic` is a real per-channel dispersion pipeline rather than a
 * colour overlay. Each channel is separated with feColorMatrix, displaced
 * independently, then recombined additively — which is how a lens actually
 * fails to focus wavelengths at the same point.
 *
 * `#lg-backdrop-warp` bends what is behind the glass. It only takes effect
 * where the engine honours an SVG filter reference inside backdrop-filter;
 * everything above degrades cleanly without it.
 */
export function GlassFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id="lg-chromatic"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          {/* Soften first: displacing a hard edge produces stair-stepping,
              displacing a soft one produces a bend. */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="soft" />

          {/* Low-frequency field standing in for the surface irregularity of a
              real cast or polished element. Blurred so the displacement varies
              smoothly instead of reading as noise. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves={2}
            seed={7}
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="field" />

          {/* RED — longest wavelength, refracted least, pushed outward. */}
          <feDisplacementMap
            in="soft"
            in2="field"
            scale={2.4}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispRed"
          />
          <feColorMatrix
            in="dispRed"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="redChannel"
          />
          <feOffset in="redChannel" dx="0.6" dy="0" result="redOut" />

          {/* GREEN — reference wavelength. Undisplaced by definition; this is
              what keeps the centre of the pane neutral. */}
          <feColorMatrix
            in="soft"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="greenOut"
          />

          {/* BLUE — shortest wavelength, refracted most, pulled inward.
              Note the negative scale: equal magnitude, opposite sign to red. */}
          <feDisplacementMap
            in="soft"
            in2="field"
            scale={-2.4}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispBlue"
          />
          <feColorMatrix
            in="dispBlue"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blueChannel"
          />
          <feOffset in="blueChannel" dx="-0.6" dy="0" result="blueOut" />

          {/* Recombine. Screen is additive, matching how the three channels
              sum back to white wherever they still overlap. */}
          <feBlend in="redOut" in2="greenOut" mode="screen" result="rg" />
          <feBlend in="rg" in2="blueOut" mode="screen" />
        </filter>

        <filter
          id="lg-backdrop-warp"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006"
            numOctaves={2}
            seed={11}
            result="warpField"
          />
          <feGaussianBlur in="warpField" stdDeviation="3" result="warpSoft" />
          {/* Scale 6 on a 24px blur is roughly a two-pixel bend in the
              already-diffuse backdrop — legible as depth, never as distortion. */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="warpSoft"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
