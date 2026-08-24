import type { MetadataRoute } from 'next';
import { appUrl } from '@/lib/seo/urls';

/**
 * Paths disallowed under EVERY locale prefix. With `localePrefix: 'as-needed'`
 * the default locale is unprefixed (`/foo`) while others carry a prefix
 * (`/en/foo`), so each entry is emitted in both forms — otherwise a crawler
 * reaches the path through the prefix.
 *
 * The site is entirely public right now; only the route handlers are excluded.
 */
const PRIVATE_PATHS = ['/api/'];

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
