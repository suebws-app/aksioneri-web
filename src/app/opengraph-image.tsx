import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo/metadata';

// Facebook and X both crop to this ratio; anything else gets letterboxed.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = SITE_NAME;

/**
 * Default social preview image, rendered at request time by Satori.
 *
 * Only a small CSS subset is supported: flexbox, absolute positioning, and
 * simple text. No grid, no external stylesheets, no remote fonts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#ededed',
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2 }}>
        {SITE_NAME}
      </div>
    </div>,
    size,
  );
}
