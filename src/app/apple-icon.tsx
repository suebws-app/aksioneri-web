import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo/metadata';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#ededed',
        fontSize: 120,
        fontWeight: 600,
        letterSpacing: -4,
      }}
    >
      {SITE_NAME.charAt(0)}
    </div>,
    size,
  );
}
