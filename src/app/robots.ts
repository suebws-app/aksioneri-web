import type { MetadataRoute } from 'next';
import { appUrl } from '@/lib/seo/urls';

/**
 * Paths disallowed under EVERY locale prefix. With `localePrefix: 'as-needed'`
 * the default locale is unprefixed (`/foo`) while others carry a prefix
 * (`/en/foo`), so each entry is emitted in both forms — otherwise a crawler
 * reaches the path through the prefix.
 *
 * The site is entirely public right now. Excluded are the route handlers and
 * the search results page: `/search?q=` is one URL per query, thin, and every
 * result duplicates a page that is already indexed on its own.
 */
const PRIVATE_PATHS = ['/api/', '/search'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...PRIVATE_PATHS, ...PRIVATE_PATHS.map((p) => `/*${p}`)],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl,
  };
}
