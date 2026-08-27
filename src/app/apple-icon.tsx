import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo/metadata';

// Apple's canonical touch-icon size; iOS scales the rest down from it.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Apple touch icon, rendered by Satori in the same dark brand style as
 * `opengraph-image.tsx`. iOS ignores `icon.svg` for home-screen bookmarks and
 * falls back to a screenshot without this route.
 *
 * No rounded corners: iOS applies its own mask, and pre-rounding would show
 * dark seams at the corners.
 *
 * `proxy.ts` already excludes `apple-icon` from its matcher — without that,
 * next-intl would rewrite the route to `/sq/apple-icon`, which does not exist.
 */
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
