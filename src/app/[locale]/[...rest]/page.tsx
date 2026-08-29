import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'notFound' });

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
