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
  if (!calculator) return {};

  const content = await getCalculatorContent(calculator, locale);

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    // The bare path, deliberately. A calculator's inputs live in the query
    // string, which makes its parameter space infinite; the canonical
    // collapses all of it onto one URL. A shared link still renders and is
    // still indexable-looking to a reader — it simply is not a second page.
    path: `/calculators/${slug}`,
    locale,
  });
}

/**
 * Fetch whatever a calculator's `marketData` declaration asks for.
 *
 * Returns a partial `ComputeContext`. Every fetch is a `safely()` wrapper, so
 * an upstream outage yields `undefined` rather than throwing — and the engine
 * then refuses with `noData`, which the page renders as a stated reason plus
 * manual entry. That chain is the whole reason the need is declared rather
 * than discovered.
 */
async function loadMarketData(kind: string): Promise<{
  rates?: Record<string, number>;
  dataDate?: string;
  dataSource?: string;
}> {
  if (kind === 'fxRate' || kind === 'fxSeries') {
    const latest = await getFxLatest('EUR');
    if (!latest) return {};

    // Stored against the euro, which is exactly what the engine expects.
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

  // Decoded on the server, so the first paint already shows the answer for a
  // shared link — with no JavaScript, and before hydration. `decode` never
  // throws: a mangled parameter costs its own field and nothing else.
  const initialInput = calculator.urlCodec.decode(
    query,
    calculator.defaults as never,
  ) as Record<string, unknown>;

  // Whatever the calculator declared it needs, fetched here so the first
  // paint already carries a real answer. `marketData: { kind: 'none' }` — the
  // case for eight of the ten — skips this entirely and costs no request.
  const marketData = await loadMarketData(calculator.marketData.kind);

  const ctx = {
    // Injected rather than read inside the engine, so the server and the
    // browser compute the same number from the same URL.
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
          __html: JSON.stringify(
            webApplicationSchema(locale, {
              name: content.metaTitle,
              description: content.metaDescription,
              path: `/calculators/${slug}`,
              category: 'FinanceApplication',
            }),
          ),
        }}
      />
      {/* Every question and answer here is rendered on the page inside a
          <details>, so this describes content a reader can actually find. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(content.faq)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
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
