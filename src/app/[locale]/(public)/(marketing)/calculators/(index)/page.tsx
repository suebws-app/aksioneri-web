import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import {
  CalculatorsIndexPage,
  getCalculators,
  readCategory,
} from '@/features/calculators';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemListSchema, safeJsonLd } from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculators' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Bare path: the category and search filters are views of this page, not
    // pages of their own, so they canonicalise back here.
    path: '/calculators',
    locale,
  });
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;

  const query = await searchParams;
  const t = await getTranslations({ locale, namespace: 'calculators' });

  const items = getCalculators().map((calculator) => ({
    name: t(`${calculator.messageKey}.heading`),
    path: `/calculators/${calculator.slug}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(itemListSchema(locale, items)),
        }}
      />
      <CalculatorsIndexPage locale={locale} category={readCategory(query)} />
    </>
  );
}
