import { cache } from 'react';
import type { Locale } from '@/i18n/config';
import {
  ApiError,
  apiFetch,
  type PaginatedResponse,
  type RequestOptions,
} from './client';

/**
 * The live news wire, served by aksioneri-api's `/news` endpoints.
 *
 * Two things are worth knowing before changing anything here.
 *
 * **Every function is wrapped in React's `cache()`.** Pages call the same
 * function from both `generateMetadata` and the component body, and detail
 * pages fan out across several features; without request-scoped deduplication
 * a single render would make each call twice.
 *
 * **Nothing throws on an empty wire.** The seed data these functions replaced
 * threw when a story was missing, which was safe when the data was a constant.
 * Over HTTP it is not: the API being cold, restarting or mid-first-ingest is a
 * normal state, and it must render an empty page rather than a 500.
 */

/** Editorial desk a story belongs to. Mirrors `NEWS_CATEGORIES` in the API. */
export type NewsCategory =
  'macro' | 'stocks' | 'europe' | 'crypto' | 'commodities' | 'economy';

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  /** One-sentence standfirst shown in listings. */
  summary: string;
  /** Minutes since publication, formatted into "2 h ago" at render time. */
  minutesAgo: number;
  readingMinutes: number;
  /** ISO instant of publication. */
  publishedAt: string;
  /** Byline. Null when the feed gave no author. */
  author?: { name: string; desk: string | null; initials: string } | null;
  /** Lead image, hosted by the publisher. */
  imageUrl?: string | null;
  /** The original story. Every article page links to it. */
  sourceUrl?: string;
  sourceName?: string;
  /** True when the text shown is machine-translated rather than original. */
  translated?: boolean;
  /**
   * Whether we hold the article text and can render a page for it.
   *
   * False when the publisher serves its feed to anyone but refuses the article
   * page to robots. Those stories are still listed — the card links straight
   * to the original instead of to a page of ours with nothing on it.
   */
  hasPage?: boolean;
  /** Opening paragraphs. Empty on list responses — only detail carries them. */
  body?: string[];
  /** Body sections that follow the opening paragraphs. */
  sections?: { heading: string; paragraphs: string[] }[];

  /**
   * Editorial extras the components render when present. The wire supplies
   * none of them — an RSS item is a headline and a link — but the templates
   * still support them, so hand-written or enriched stories keep working.
   */
  ticker?: { symbol: string; changePercent: number };
  whyItMatters?: string;
  heroCaption?: string;
  inNumbers?: { value: string; label: string; tone?: 'positive' | 'neutral' }[];
  pullQuote?: { quote: string; attribution: string };
  terms?: { term: string; definition: string }[];
  mentionedSymbols?: string[];
  relatedEventSlug?: string;
}

/** The compact shape the "most read" rail renders. */
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

/**
 * Matches the `revalidate` on the pages. The API polls the feeds once a minute,
 * so caching a response for longer would hide stories that have already
 * arrived, and for less would re-fetch data that cannot have changed.
 */
const REVALIDATE_SECONDS = 60;

/** Named so `revalidateTag('news')` can flush the whole wire at once. */
const NEWS_TAG = 'news';

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: [NEWS_TAG] },
};

/**
 * Swallows the "API is unreachable" case and returns a fallback.
 *
 * A 404 is data — the caller wants `null` for it. Anything else is logged
 * server-side and degrades to an empty page: a wire outage should cost the
 * visitor a section, not the whole site.
 */
async function safely<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return fallback;
    console.error('[news] request failed:', error);
    return fallback;
  }
}

/** How many stories a page of the wire holds. */
export const ARTICLES_PER_PAGE = 20;

export interface ArticleFeed {
  articles: NewsArticle[];
  /**
   * ISO instant to pass back as `cursor` for the next page, or `null` at the
   * end of the wire. A cursor rather than an offset: stories arrive every
   * minute, and an offset would shift rows under a reader mid-page.
   */
  nextCursor: string | null;
}

/**
 * One page of the wire.
 *
 * Filtering happens in the API, not here — a category with few stories should
 * still fill a page, which it cannot do if the filter is applied to an
 * already-truncated list.
 */
export interface ArticlePageQuery {
  category?: NewsCategory;
  cursor?: string;
}

/**
 * One page of the wire, callable from the browser as well as the server.
 *
 * Deliberately not wrapped in `cache()` and not carrying `next` revalidation
 * options: both are server-only, and this is what the client feed calls when
 * the reader asks for more.
 */
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
  return { articles: response.data, nextCursor: response.nextCursor };
}

export const getArticlePage = cache(
  async (
    locale: Locale,
    options: ArticlePageQuery = {},
  ): Promise<ArticleFeed> =>
    safely(
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
        return { articles: response.data, nextCursor: response.nextCursor };
      },
      { articles: [], nextCursor: null },
    ),
);

/** The newest stories, unpaginated. For rails and related-story lists. */
export const getArticles = cache(
  async (locale: Locale, category?: NewsCategory): Promise<NewsArticle[]> => {
    const page = await getArticlePage(locale, category ? { category } : {});
    return page.articles;
  },
);

/** How many stories a search returns before the reader should narrow it. */
export const SEARCH_LIMIT = 12;

/**
 * Search the whole archive, not the page of twenty the wire is showing.
 *
 * The site's own index carries only the newest stories — enough for the nav
 * dropdown, useless for "that piece about Nvidia last month". This asks the
 * API, which searches headlines and standfirsts across everything it holds, in
 * both the source text and the Albanian translation.
 *
 * Fails soft like every other read here: no wire means no news results, not a
 * broken search page.
 */
export const searchArticles = cache(
  async (locale: Locale, query: string): Promise<NewsArticle[]> =>
    safely(async () => {
      const response = await apiFetch<PaginatedResponse<NewsArticle>>(
        'news/search',
        {
          searchParams: { locale, q: query, limit: SEARCH_LIMIT },
          ...cacheOptions,
        },
      );
      return response.data;
    }, []),
);

/** The lead story. `null` while the wire is still empty. */
export const getFeaturedArticle = cache(
  async (locale: Locale): Promise<NewsArticle | null> =>
    safely(
      () =>
        apiFetch<NewsArticle | null>('news/featured', {
          searchParams: { locale },
          ...cacheOptions,
        }),
      null,
    ),
);

export const getMostRead = cache(
  async (locale: Locale): Promise<MostReadEntry[]> =>
    safely(
      () =>
        apiFetch<MostReadEntry[]>('news/most-read', {
          searchParams: { locale },
          ...cacheOptions,
        }),
      [],
    ),
);

export const getArticleBySlug = cache(
  async (locale: Locale, slug: string): Promise<NewsArticle | null> =>
    safely(
      () =>
        apiFetch<NewsArticle>(`news/${encodeURIComponent(slug)}`, {
          searchParams: { locale },
          ...cacheOptions,
        }),
      null,
    ),
);

/**
 * Every published slug with its publication date.
 *
 * Feeds `generateStaticParams` and the sitemap, so it must never throw: a
 * failure here would fail `next build` outright, and an unreachable API at
 * build time is not a reason to have no site.
 */
export const getArticleIndex = cache(async (): Promise<SlugEntry[]> =>
  safely(() => apiFetch<SlugEntry[]>('news/slugs', cacheOptions), []),
);

export const getArticleSlugs = cache(async (): Promise<string[]> => {
  const index = await getArticleIndex();
  return index.map((entry) => entry.slug);
});
