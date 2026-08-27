import type { MetadataRoute } from 'next';
import { PRIVATE_PATHS } from '@/config/routes';
import { appUrl } from '@/lib/seo/urls';
import { serverEnv } from '@/lib/utils/env.server';

/**
 * Paths disallowed under EVERY locale prefix. With `localePrefix: 'as-needed'`
 * the default locale is unprefixed (`/foo`) while others carry a prefix
 * (`/en/foo`), so each entry is emitted in both forms — otherwise a crawler
 * reaches the path through the prefix.
 *
 * The list itself lives in `@/config/routes` so `proxy.ts` can consume the
 * same source of truth when the auth gate is wired back on.
 *
 * `PRIVATE_PATHS` currently lists `/api/`, which the web origin does not own —
 * that path is the aksioneri-api backend on a different origin. Filter it out
 * here rather than editing `config/routes.ts` (owned by another concern), and
 * open a follow-up to drop it at the source.
 */
const CRAWL_DISALLOWED = PRIVATE_PATHS.filter((p) => p !== '/api/');

/**
 * Tracker query parameters. Google collapses these into the canonical URL
 * automatically, but robots-based hinting is faster and cheaper than waiting
 * for a canonical to be honoured, especially on smaller crawlers that don't
 * canonicalize aggressively.
 */
const TRACKER_PARAM_PATTERNS = [
  '/*?*utm_',
  '/*?*fbclid',
  '/*?*gclid',
  '/*?*mc_cid',
  '/*?*mc_eid',
];

export default function robots(): MetadataRoute.Robots {
  // NOINDEX=true marks a staging or preview deployment: refuse all crawling,
  // and advertise no sitemap — `buildMetadata` stamps `noindex` on every
  // page in the same mode. See `env.server.ts`.
  if (serverEnv.NOINDEX) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          ...CRAWL_DISALLOWED,
          ...CRAWL_DISALLOWED.map((p) => `/*${p}`),
          ...TRACKER_PARAM_PATTERNS,
        ],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl,
  };
}
