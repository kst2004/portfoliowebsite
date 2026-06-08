import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#14181e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SK letters */}
        <span
          style={{
            color: '#EEEEEE',
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-1px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          SK
        </span>

        {/* Gold underline */}
        <div
          style={{
            height: '2px',
            width: '36px',
            background: '#B55400',
            borderRadius: '2px',
            marginTop: '3px',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
