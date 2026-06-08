import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
            fontSize: '96px',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-3px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          SK
        </span>

        {/* Gold underline */}
        <div
          style={{
            height: '5px',
            width: '130px',
            background: '#B55400',
            borderRadius: '4px',
            marginTop: '10px',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
