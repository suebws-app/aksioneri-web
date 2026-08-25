import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StaticPage, STATIC_PAGES } from '@/features/site';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages' });

  return buildMetadata({
    title: t('about.metaTitle'),
    description: t('about.metaDescription'),
    path: '/about',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StaticPage page={STATIC_PAGES.about} />;
}
