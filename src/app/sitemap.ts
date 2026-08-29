import type { MetadataRoute } from 'next';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonSlugs, getTopics } from '@/features/learn';
import { getCalculators } from '@/features/calculators';
import { getArticleIndex } from '@/features/news';
import { getQuotes } from '@/lib/api/markets';
import { defaultLocale } from '@/i18n/config';
import { localizedAbsoluteUrl } from '@/lib/seo/urls';

export const revalidate = 3600;

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

interface SitemapPath {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
}

const SECTIONS: SitemapPath[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/news', priority: 0.9, changeFrequency: 'hourly' },
  { path: '/calendar', priority: 0.9, changeFrequency: 'daily' },
  { path: '/markets', priority: 0.8, changeFrequency: 'daily' },
  { path: '/learn', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/calculators', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/learn/glossary', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

async function detailPaths(): Promise<SitemapPath[]> {
  const lessonSlugs = new Set([
    ...getLessonSlugs(defaultLocale),
    ...getTopics(defaultLocale).flatMap((topic) =>
      topic.lessons.map((lesson) => lesson.slug),
    ),
  ]);

  const [articles, quotes] = await Promise.all([
    getArticleIndex(defaultLocale),
    getQuotes(),
  ]);

  return [
    ...getCalculators().map((calculator) => ({
      path: `/calculators/${calculator.slug}`,
      priority: 0.7,
      changeFrequency:
        calculator.marketData.kind === 'none'
          ? ('monthly' as const)
          : ('daily' as const),
    })),
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
  const details = await detailPaths();

  return [...SECTIONS, ...details].map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: localizedAbsoluteUrl(defaultLocale, path),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
    }),
  );
}
