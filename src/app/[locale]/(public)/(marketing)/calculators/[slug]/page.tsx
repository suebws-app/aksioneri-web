import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import {
  CalculatorPage,
  getCalculator,
  getCalculatorContent,
  getCalculatorSlugs,
} from '@/features/calculators';
import { getFxLatest, getPolicyRate } from '@/lib/api/rates';
import {
  breadcrumbSchema,
  faqPageSchema,
  safeJsonLd,
  webApplicationSchema,
} from '@/lib/seo/schemas';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCalculatorSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const content = await getCalculatorContent(calculator, locale);

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/calculators/${slug}`,
    locale,
  });
}

async function loadMarketData(kind: string): Promise<{
  rates?: Record<string, number>;
  dataDate?: string;
  dataSource?: string;
}> {
  if (kind === 'fxRate' || kind === 'fxSeries') {
    const latest = await getFxLatest('EUR');
    if (!latest) return {};

    return {
      rates: latest.rates,
      dataDate: latest.date,
      dataSource: latest.source,
    };
  }

  if (kind === 'policyRate') {
    const rate = await getPolicyRate('ECB_MRO');
    return rate
      ? {
          rates: { ECB_MRO: rate.rate },
          dataDate: rate.effectiveDate,
          dataSource: rate.source,
        }
      : {};
  }

  return {};
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale, slug } = await params;

  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const query = await searchParams;

  const initialInput = calculator.urlCodec.decode(
    query,
    calculator.defaults as never,
  ) as Record<string, unknown>;

  const marketData = await loadMarketData(calculator.marketData.kind);

  const ctx = {
    today: new Date().toISOString().slice(0, 10),
    currency: 'EUR' as const,
    ...marketData,
  };

  const content = await getCalculatorContent(calculator, locale);
  const t = await getTranslations({ locale, namespace: 'calculators' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            webApplicationSchema(locale, {
              name: content.metaTitle,
              description: content.metaDescription,
              path: `/calculators/${slug}`,
              category: 'FinanceApplication',
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(faqPageSchema(content.faq)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            breadcrumbSchema(locale, [
              { name: t('breadcrumbRoot'), path: '/calculators' },
              { name: content.heading, path: `/calculators/${slug}` },
            ]),
          ),
        }}
      />

      <CalculatorPage
        calculator={calculator}
        locale={locale}
        initialInput={initialInput}
        ctx={ctx}
      />
    </>
  );
}
