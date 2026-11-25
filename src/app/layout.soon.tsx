import type { Metadata } from 'next';
import { IBM_Plex_Sans, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

// Coming-soon root layout. Only used when COMING_SOON mode is on (next.config.ts).

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aksioneri — Së shpejti',
  description: 'Aksioneri po vjen së shpejti.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="sq"
      className={`${newsreader.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
