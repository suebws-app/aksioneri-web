import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Catch-all for URLs that match no real route. The proxy rewrites every page
 * request into `/[locale]/…`, so without this a stray URL would bubble out of
 * the locale tree and lose the localized 404 shell. No `loading.tsx` here on
 * purpose: streaming would flush a 200 before `notFound()` could set the 404.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'notFound' });

  // No canonical on a 404: pointing this page at `/` teaches crawlers that the
  // home is the canonical version of an unrelated URL, muddying its ranking
  // signals. The response is already a real 404, so the canonical is not the
  // primary signal — but leaving it out keeps every signal consistent.
  return buildMetadata({
    title: t('metaTitle'),
    description: t('body'),
    path: '/',
    locale,
    noIndex: true,
    noCanonical: true,
  });
}

export default function CatchAllPage() {
  notFound();
}
