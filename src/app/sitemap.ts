import type { MetadataRoute } from 'next';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonSlugs, getTopics } from '@/features/learn';
import { getQuotes } from '@/features/markets';
import { getArticleSlugs } from '@/features/news';
import { locales } from '@/i18n/config';
import { buildLanguageAlternates, localizedAbsoluteUrl } from '@/lib/seo/urls';

/**
 * Public routes only. Anything listed in `robots.ts` under PRIVATE_PATHS must
 * never appear here — a sitemap entry for a disallowed URL is a crawl error.
 */
const SECTIONS: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/news', priority: 0.9 },
  { path: '/calendar', priority: 0.9 },
  { path: '/learn', priority: 0.8 },
];

/**
 * Detail pages, collected from the same sources the routes render from, so a
 * new story or lesson appears in the sitemap without a second edit.
 *
 * Lesson slugs come from both the top-level list and the topic lists, since
 * `/learn/[slug]` resolves against both.
 */
function detailPaths(): { path: string; priority: number }[] {
  const lessonSlugs = new Set([
    ...getLessonSlugs(),
    ...getTopics('en').flatMap((topic) =>
      topic.lessons.map((lesson) => lesson.slug),
    ),
  ]);

  return [
    ...getArticleSlugs().map((slug) => ({
      path: `/news/${slug}`,
      priority: 0.7,
    })),
    ...[...lessonSlugs].map((slug) => ({
      path: `/learn/${slug}`,
      priority: 0.6,
    })),
    ...getCalendarWeek('en')
      .days.flatMap((day) => day.events)
      .map((event) => ({ path: `/calendar/${event.slug}`, priority: 0.6 })),
    ...getQuotes('en').map((quote) => ({
      path: `/markets/${quote.symbol}`,
      priority: 0.6,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...SECTIONS, ...detailPaths()].flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: localizedAbsoluteUrl(locale, path),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority,
      // Every locale variant of a page points at all the others, which is what
      // stops them competing as duplicates.
      alternates: { languages: buildLanguageAlternates(path) },
    })),
  );
}
