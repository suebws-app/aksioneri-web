import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { locales, type Locale } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/Providers';
import { SITE_NAME } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema } from '@/lib/seo/schemas';
import { appUrl } from '@/lib/seo/urls';

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
    icons: { icon: '/favicon.ico' },
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

  // Required for static rendering — without it every page opts into dynamic.
  setRequestLocale(locale);

  const typedLocale = locale as Locale;

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Built from constants in lib/seo/schemas.ts — never user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
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
