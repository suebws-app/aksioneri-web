import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { appUrl } from '@/lib/seo/urls';
import './globals.css';

/**
 * Only `metadataBase` lives here: routes outside the `[locale]` tree
 * (opengraph-image, not-found) need it to resolve relative image URLs, and they
 * never reach the locale layout that sets the rest of the metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
};

/**
 * The root layout renders nothing but a passthrough: `[locale]/layout.tsx` owns
 * `<html>` and `<body>` because it is the first place the locale is known, and
 * `<html lang>` must carry the real locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
