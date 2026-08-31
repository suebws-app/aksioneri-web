import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MarketsIndexPage } from '@/features/markets';
import { normalizeTab } from '@/features/markets/marketsUniverse';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  return buildMetadata({
    title: t('indexMetaTitle'),
    description: t('indexMetaDescription'),
    path: '/markets',
    locale,
  });
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const tab = normalizeTab(sp.tab);

  return <MarketsIndexPage locale={locale} tab={tab} basePath="/markets" />;
}
