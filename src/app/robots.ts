import type { MetadataRoute } from 'next';
import { PRIVATE_PATHS } from '@/config/routes';
import { appUrl } from '@/lib/seo/urls';

/**
 * Paths disallowed under EVERY locale prefix. With `localePrefix: 'as-needed'`
 * the default locale is unprefixed (`/foo`) while others carry a prefix
 * (`/en/foo`), so each entry is emitted in both forms — otherwise a crawler
 * reaches the path through the prefix.
 *
 * The list itself lives in `@/config/routes` so `proxy.ts` can consume the
 * same source of truth when the auth gate is wired back on.
 */

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
