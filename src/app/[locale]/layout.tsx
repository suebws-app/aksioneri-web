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
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="focus:bg-paper focus:text-ink focus:border-line sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:border focus:px-4 focus:py-2"
        >
          {t('skipToMain')}
        </a>
        <script
          type="application/ld+json"
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
