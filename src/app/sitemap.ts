import type { MetadataRoute } from 'next';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonSlugs, getTopics } from '@/features/learn';
import { getArticleIndex } from '@/features/news';
import { SUPPORTED_SYMBOLS } from '@/lib/api/markets';
import { defaultLocale } from '@/i18n/config';
import { localizedAbsoluteUrl } from '@/lib/seo/urls';

interface SitemapPath {
  path: string;
  priority: number;
  /**
   * When the content itself last changed. Stories carry a real publication
   * date; the seeded sections have no per-entity timestamp, so they fall back
   * to request time.
   */
  lastModified?: Date;
}

/**
 * Public routes only. Anything listed in `robots.ts` under PRIVATE_PATHS must
 * never appear here — a sitemap entry for a disallowed URL is a crawl error.
 */
const SECTIONS: SitemapPath[] = [
  { path: '/', priority: 1 },
  { path: '/news', priority: 0.9 },
  { path: '/calendar', priority: 0.9 },
  { path: '/markets', priority: 0.8 },
  { path: '/learn', priority: 0.8 },
  { path: '/learn/glossary', priority: 0.7 },
  // Standing pages: rarely edited, but a site with no about or privacy page
  // in its sitemap looks abandoned to a crawler.
  { path: '/about', priority: 0.4 },
  { path: '/contact', priority: 0.4 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
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

  const articles = await getArticleIndex();

  return [
    ...articles.map((entry) => ({
      path: `/news/${entry.slug}`,
      priority: 0.7,
      lastModified: new Date(entry.publishedAt),
    })),
    ...[...lessonSlugs].map((slug) => ({
      path: `/learn/${slug}`,
      priority: 0.6,
    })),
    ...getCalendarWeek(defaultLocale)
      .days.flatMap((day) => day.events)
      .map((event) => ({ path: `/calendar/${event.slug}`, priority: 0.6 })),
    ...SUPPORTED_SYMBOLS.map((symbol) => ({
      path: `/markets/${symbol}`,
      priority: 0.6,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const details = await detailPaths();

  // One entry per page. There used to be one per locale, cross-referenced with
  // hreflang; with a single language there is nothing to alternate between.
  return [...SECTIONS, ...details].map(({ path, priority, lastModified }) => ({
    url: localizedAbsoluteUrl(defaultLocale, path),
    lastModified: lastModified ?? now,
    changeFrequency: 'weekly' as const,
    priority,
  }));
}
