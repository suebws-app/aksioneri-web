import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
    title: t('terms.metaTitle'),
    description: t('terms.metaDescription'),
    path: '/terms',
    locale,
  });
}

export default function Page() {
  return <StaticPage page={STATIC_PAGES.terms} />;
}
