import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { buildLanguageAlternates, localizedAbsoluteUrl } from '@/lib/seo/urls';

/**
 * Public routes only. Anything listed in `robots.ts` under PRIVATE_PATHS must
 * never appear here — a sitemap entry for a disallowed URL is a crawl error.
 *
 * Dynamic entities (fetched from the API) get appended here once those modules
 * exist; keep the static list as the first block.
 */
const PUBLIC_ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.flatMap(({ path, priority }) =>
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
