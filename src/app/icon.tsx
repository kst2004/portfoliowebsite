import { ImageResponse } from 'next/og';
import { LOGO_ASPECT, LOGO_DATA_URI } from './logo-mark';

export const runtime = 'edge';
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

const MARK_HEIGHT = 30;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={LOGO_DATA_URI}
          width={Math.round(MARK_HEIGHT * LOGO_ASPECT)}
          height={MARK_HEIGHT}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
