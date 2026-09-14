import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { EmptyState } from '@/components/EmptyState';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { ArticleMeta } from '@/features/news/components/ArticleMeta';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import { getArticles } from '@/features/news';
import type { NewsArticle } from '@/lib/api/news';
import { getEarningsArticles } from '@/lib/api/news';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { getAssetDetail } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();
  const t = await getTranslations({ locale, namespace: 'company.news' });
  return buildMetadata({
    title: t('metaTitle', { name: asset.name }),
    description: t('metaDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}/news`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({ locale, namespace: 'company.news' });

  const [earnings, allArticles] = await Promise.all([
    getEarningsArticles(locale, asset.ticker),
    getArticles(locale),
  ]);

  const earningsIds = new Set(earnings.map((article) => article.id));
  const mentions = findArticlesMentioning(
    [asset.name, asset.ticker],
    allArticles,
    30,
  ).filter(
    (article) =>
      article.category !== 'earnings' && !earningsIds.has(article.id),
  );

  const hasContent = earnings.length > 0 || mentions.length > 0;

  return (
    <div className="page-container pt-8">
      <header className="mb-6">
        <h1 className="text-ink font-serif text-[32px] font-medium">
          {t('heading', { name: asset.name })}
        </h1>
      </header>

      {earnings.length > 0 ? (
        <section className="mb-10" aria-labelledby="earnings-heading">
          <div className="mb-4">
            <h2
              id="earnings-heading"
              className="text-ink font-serif text-[22px] font-medium"
            >
              {t('earningsHeading')}
            </h2>
            <p className="text-ink-muted mt-1 text-[14px]">
              {t('earningsSubheading')}
            </p>
          </div>
          <ul>
            {earnings.map((article) => (
              <li
                key={article.id}
                className="border-line border-t py-5 last:border-b"
              >
                <ArticleRow article={article} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {mentions.length === 0 && earnings.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
        />
      ) : mentions.length > 0 ? (
        <ul>
          {mentions.map((article) => (
            <li
              key={article.id}
              className="border-line border-t py-5 last:border-b"
            >
              <ArticleRow article={article} />
            </li>
          ))}
        </ul>
      ) : null}

      {!hasContent && null}
    </div>
  );
}

function ArticleRow({ article }: { article: NewsArticle }) {
  return (
    <>
      <h3 className="text-ink mb-2 font-serif text-[21px] leading-[1.24] font-medium">
        <Link href={`/news/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="text-ink-muted mb-2.5 max-w-[74ch] text-[15px] leading-relaxed">
        {article.summary}
      </p>
      <ArticleMeta article={article} variant="full" className="text-[12.5px]" />
    </>
  );
}
