import type { MetadataRoute } from 'next';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonSlugs, getTopics } from '@/features/learn';
import { getArticleIndex } from '@/features/news';
import { getQuotes } from '@/lib/api/markets';
import { defaultLocale } from '@/i18n/config';
import { localizedAbsoluteUrl } from '@/lib/seo/urls';

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

interface SitemapPath {
  path: string;
  priority: number;
  /** How often this URL changes — hints crawler re-fetch cadence. */
  changeFrequency: ChangeFrequency;
  /**
   * When the content itself last changed. Stories carry a real publication
   * date; the seeded sections have no per-entity timestamp, so they fall back
   * to request time.
   */
  lastModified?: Date;
}

/**
 * Public routes only. Anything listed in `@/config/routes` under PRIVATE_PATHS
 * must never appear here — a sitemap entry for a disallowed URL is a crawl
 * error.
 */
const SECTIONS: SitemapPath[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/news', priority: 0.9, changeFrequency: 'hourly' },
  { path: '/calendar', priority: 0.9, changeFrequency: 'daily' },
  { path: '/markets', priority: 0.8, changeFrequency: 'daily' },
  { path: '/learn', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/learn/glossary', priority: 0.7, changeFrequency: 'monthly' },
  // Standing pages: rarely edited, but a site with no about or privacy page
  // in its sitemap looks abandoned to a crawler.
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Detail pages, collected from the same sources the routes render from, so a
 * new story or lesson appears in the sitemap without a second edit.
 *
 * Lesson slugs come from both the top-level list and the topic lists, since
 * `/learn/[slug]` resolves against both.
 */
async function detailPaths(): Promise<SitemapPath[]> {
  const lessonSlugs = new Set([
    ...getLessonSlugs(),
    ...getTopics(defaultLocale).flatMap((topic) =>
      topic.lessons.map((lesson) => lesson.slug),
    ),
  ]);

  // Market symbols come from the live API so a new instrument on the backend
  // shows up in the sitemap without a code deploy on the web.
  const [articles, quotes] = await Promise.all([
    getArticleIndex(),
    getQuotes(),
  ]);

  return [
    ...articles.map((entry) => ({
      path: `/news/${entry.slug}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      lastModified: new Date(entry.publishedAt),
    })),
    ...[...lessonSlugs].map((slug) => ({
      path: `/learn/${slug}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    })),
    ...(await getCalendarWeek(defaultLocale)).days
      .flatMap((day) => day.events)
      .map((event) => ({
        path: `/calendar/${event.slug}`,
        priority: 0.6,
        changeFrequency: 'daily' as const,
      })),
    ...quotes.map((quote) => ({
      path: `/markets/${quote.symbol}`,
      priority: 0.6,
      changeFrequency: 'daily' as const,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const details = await detailPaths();

  // One entry per page. There used to be one per locale, cross-referenced with
  // hreflang; with a single language there is nothing to alternate between.
  return [...SECTIONS, ...details].map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: localizedAbsoluteUrl(defaultLocale, path),
      lastModified: lastModified ?? now,
      changeFrequency,
      priority,
    }),
  );
}
