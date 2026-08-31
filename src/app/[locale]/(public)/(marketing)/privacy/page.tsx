import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StaticPage, getStaticPage } from '@/features/site';
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
    title: t('privacy.metaTitle'),
    description: t('privacy.metaDescription'),
    path: '/privacy',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <StaticPage page={getStaticPage(locale, 'privacy')} />;
}
