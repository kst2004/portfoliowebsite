import { ImageResponse } from 'next/og';
import { LOGO_ASPECT, LOGO_DATA_URI } from './logo-mark';

export const runtime = 'edge';

const MARK_HEIGHT = 92;
export const alt = 'Saiteja Kolan — Freelance Creative Designer & 3D Visualizer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent radial glows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.10) 0%, transparent 48%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.05) 0%, transparent 42%)',
          }}
        />

        {/* White accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.3) 60%, transparent 100%)',
          }}
        />

        {/* Brand mark — pinned top-left */}
        <img
          src={LOGO_DATA_URI}
          width={Math.round(MARK_HEIGHT * LOGO_ASPECT)}
          height={MARK_HEIGHT}
          alt=""
          style={{ position: 'absolute', top: '72px', left: '80px' }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
          {/* Kicker */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '4px',
            }}
          >
            <div style={{ height: '1px', width: '36px', background: '#FFFFFF', opacity: 0.8 }} />
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '13px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              Hyderabad, India
            </span>
          </div>

          {/* Name */}
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '82px',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            SAITEJA KOLAN
          </span>

          {/* Title */}
          <span
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '22px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              marginTop: '4px',
            }}
          >
            Freelance Creative Designer &amp; 3D Visualizer
          </span>

          {/* Services */}
          <span
            style={{
              color: 'rgba(255,255,255,0.38)',
              fontSize: '14px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: '8px',
            }}
          >
            Brand Identity · 3D Visualization · Print Design · Architecture
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
