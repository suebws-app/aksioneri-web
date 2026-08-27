import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { locales, type Locale } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/Providers';
import { SITE_NAME } from '@/lib/seo/metadata';
import {
  organizationSchema,
  safeJsonLd,
  webSiteSchema,
} from '@/lib/seo/schemas';
import { appUrl } from '@/lib/seo/urls';
import '../globals.css';

// 'latin-ext' is required for Albanian — ë and ç live outside the latin subset
// and would otherwise fall back to a system face mid-word.
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

/** Pre-renders every locale at build time instead of on first request. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: t('defaultTitle'),
      // Pages set a bare title; the site name is appended here.
      template: `%s | ${SITE_NAME}`,
    },
    description: t('defaultDescription'),
    applicationName: SITE_NAME,
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js 16: params is a Promise and must be awaited.
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Static rendering needs no `setRequestLocale`: this is the root layout, so
  // `[locale]` is a root param and `src/i18n/request.ts` reads it through
  // `next/root-params` instead of the dynamic request headers.

  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* First tabbable element on every page — WCAG 2.4.1 bypass block. */}
        <a
          href="#main-content"
          className="focus:bg-paper focus:text-ink focus:border-line sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:border focus:px-4 focus:py-2"
        >
          {t('skipToMain')}
        </a>
        <script
          type="application/ld+json"
          // Built from constants in lib/seo/schemas.ts — never user input.
          dangerouslySetInnerHTML={{
            __html: safeJsonLd([
              organizationSchema(),
              webSiteSchema(typedLocale),
            ]),
          }}
        />
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
