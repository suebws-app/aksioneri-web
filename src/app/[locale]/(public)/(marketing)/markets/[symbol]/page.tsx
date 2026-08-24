import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonBySlug, getTopics } from '@/features/learn';
import { AssetPage, getAssetDetail, getQuotes } from '@/features/markets';
import { getArticleBySlug } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getQuotes(locale).map((quote) => ({ locale, symbol: quote.symbol })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  const asset = getAssetDetail(
    locale,
    symbol,
    t('breadcrumbRoot'),
    t('quoteStatusFallback'),
  );

  if (!asset) {
    return buildMetadata({
      title: t('assetNotFoundTitle'),
      description: t('metaDescription'),
      path: `/markets/${symbol}`,
      locale,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: asset.name,
    description: t('assetDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'markets' });
  const asset = getAssetDetail(
    locale,
    symbol,
    t('breadcrumbRoot'),
    t('quoteStatusFallback'),
  );
  if (!asset) notFound();

  const everyEvent = getCalendarWeek(locale).days.flatMap((day) => day.events);
  const everyLesson = getTopics(locale).flatMap((topic) => topic.lessons);

  return (
    <AssetPage
      asset={asset}
      otherQuotes={getQuotes(locale)
        .filter((quote) => quote.symbol !== asset.symbol)
        .slice(0, 5)}
      events={(asset.eventSlugs ?? [])
        .map((slug) => everyEvent.find((event) => event.slug === slug))
        .filter((event) => event !== undefined)}
      lessons={(asset.lessonSlugs ?? [])
        .map(
          (slug) =>
            getLessonBySlug(locale, slug) ??
            everyLesson.find((lesson) => lesson.slug === slug),
        )
        .filter((lesson) => lesson !== undefined)}
      articles={(asset.articleSlugs ?? [])
        .map((slug) => getArticleBySlug(locale, slug))
        .filter((article) => article !== null)}
    />
  );
}
