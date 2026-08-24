import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { locales, type Locale } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/Providers';
import { SITE_NAME } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema } from '@/lib/seo/schemas';
import { appUrl } from '@/lib/seo/urls';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
