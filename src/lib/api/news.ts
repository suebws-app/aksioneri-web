import { safely } from './safely';
import { cache } from 'react';
import type { Locale } from '@/i18n/config';
import { decodeHtmlEntities } from '@/lib/utils/htmlEntities';
import {
  apiFetch,
  type PaginatedResponse,
  type RequestOptions,
} from './client';

const safelyNews = <T>(work: () => Promise<T>, fallback: T): Promise<T> =>
  safely(work, fallback, 'news');

export type NewsCategory =
  'macro' | 'stocks' | 'europe' | 'crypto' | 'commodities' | 'economy';

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  summary: string;
  minutesAgo: number;
  readingMinutes: number;
  publishedAt: string;
  author?: { name: string; desk: string | null; initials: string } | null;
  imageUrl?: string | null;
  sourceUrl?: string;
  sourceName?: string;
  translated?: boolean;
  hasPage?: boolean;
  body?: string[];
  sections?: { heading: string; paragraphs: string[] }[];

  ticker?: { symbol: string; changePercent: number };
  whyItMatters?: string;
  heroCaption?: string;
  inNumbers?: { value: string; label: string; tone?: 'positive' | 'neutral' }[];
  pullQuote?: { quote: string; attribution: string };
  terms?: { term: string; definition: string }[];
  mentionedSymbols?: string[];
  relatedEventSlug?: string;
}

export interface MostReadEntry {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  minutesAgo: number;
}

interface SlugEntry {
  slug: string;
  publishedAt: string;
}

const REVALIDATE_SECONDS = 60;

const NEWS_TAG = 'news';

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: [NEWS_TAG] },
};

function sanitizeArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    title: decodeHtmlEntities(article.title),
    summary: decodeHtmlEntities(article.summary),
    ...(article.whyItMatters
      ? { whyItMatters: decodeHtmlEntities(article.whyItMatters) }
      : {}),
    ...(article.heroCaption
      ? { heroCaption: decodeHtmlEntities(article.heroCaption) }
      : {}),
    ...(article.body
      ? { body: article.body.map((paragraph) => decodeHtmlEntities(paragraph)) }
      : {}),
    ...(article.sections
      ? {
          sections: article.sections.map((section) => ({
            heading: decodeHtmlEntities(section.heading),
            paragraphs: section.paragraphs.map((paragraph) =>
              decodeHtmlEntities(paragraph),
            ),
          })),
        }
      : {}),
    ...(article.pullQuote
      ? {
          pullQuote: {
            quote: decodeHtmlEntities(article.pullQuote.quote),
            attribution: decodeHtmlEntities(article.pullQuote.attribution),
          },
        }
      : {}),
    ...(article.terms
      ? {
          terms: article.terms.map((term) => ({
            term: decodeHtmlEntities(term.term),
            definition: decodeHtmlEntities(term.definition),
          })),
        }
      : {}),
  };
}

function sanitizeMostRead(entry: MostReadEntry): MostReadEntry {
  return { ...entry, title: decodeHtmlEntities(entry.title) };
}

export const ARTICLES_PER_PAGE = 20;

export interface ArticleFeed {
  articles: NewsArticle[];
  nextCursor: string | null;
}

export interface ArticlePageQuery {
  category?: NewsCategory;
  cursor?: string;
}

export async function fetchArticlePage(
  locale: Locale,
  options: ArticlePageQuery = {},
): Promise<ArticleFeed> {
  const response = await apiFetch<PaginatedResponse<NewsArticle>>('news', {
    searchParams: {
      locale,
      category: options.category,
      cursor: options.cursor,
      limit: ARTICLES_PER_PAGE,
    },
  });
  return {
    articles: response.data.map(sanitizeArticle),
    nextCursor: response.nextCursor,
  };
}

export const getArticlePage = cache(
  async (
    locale: Locale,
    options: ArticlePageQuery = {},
  ): Promise<ArticleFeed> =>
    safelyNews(
      async () => {
        const response = await apiFetch<PaginatedResponse<NewsArticle>>(
          'news',
          {
            searchParams: {
              locale,
              category: options.category,
              cursor: options.cursor,
              limit: ARTICLES_PER_PAGE,
            },
            ...cacheOptions,
          },
        );
        return {
          articles: response.data.map(sanitizeArticle),
          nextCursor: response.nextCursor,
        };
      },
      { articles: [], nextCursor: null },
    ),
);

export const getArticles = cache(
  async (locale: Locale, category?: NewsCategory): Promise<NewsArticle[]> => {
    const page = await getArticlePage(locale, category ? { category } : {});
    return page.articles;
  },
);

export const SEARCH_LIMIT = 12;

export const searchArticles = cache(
  async (locale: Locale, query: string): Promise<NewsArticle[]> =>
    safelyNews(async () => {
      const response = await apiFetch<PaginatedResponse<NewsArticle>>(
        'news/search',
        {
          searchParams: { locale, q: query, limit: SEARCH_LIMIT },
          ...cacheOptions,
        },
      );
      return response.data.map(sanitizeArticle);
    }, []),
);

export const getFeaturedArticle = cache(
  async (
    locale: Locale,
    category?: NewsCategory,
  ): Promise<NewsArticle | null> =>
    safelyNews(async () => {
      const article = await apiFetch<NewsArticle | null>('news/featured', {
        searchParams: { locale, category },
        ...cacheOptions,
      });
      return article ? sanitizeArticle(article) : null;
    }, null),
);

export const getMostRead = cache(
  async (locale: Locale): Promise<MostReadEntry[]> =>
    safelyNews(async () => {
      const rows = await apiFetch<MostReadEntry[]>('news/most-read', {
        searchParams: { locale },
        ...cacheOptions,
      });
      return rows.map(sanitizeMostRead);
    }, []),
);

export const getArticleBySlug = cache(
  async (locale: Locale, slug: string): Promise<NewsArticle | null> =>
    safelyNews(async () => {
      const article = await apiFetch<NewsArticle>(
        `news/${encodeURIComponent(slug)}`,
        {
          searchParams: { locale },
          ...cacheOptions,
        },
      );
      return sanitizeArticle(article);
    }, null),
);

export const getArticleIndex = cache(
  async (locale: Locale): Promise<SlugEntry[]> =>
    safelyNews(
      () =>
        apiFetch<SlugEntry[]>('news/slugs', {
          searchParams: { locale },
          ...cacheOptions,
        }),
      [],
    ),
);

export const getArticleSlugs = cache(
  async (locale: Locale): Promise<string[]> => {
    const index = await getArticleIndex(locale);
    return index.map((entry) => entry.slug);
  },
);
