import type { MetadataRoute } from 'next';
import { PRIVATE_PATHS } from '@/config/routes';
import { appUrl } from '@/lib/seo/urls';
import { serverEnv } from '@/lib/utils/env.server';

const CRAWL_DISALLOWED = PRIVATE_PATHS.filter((p) => p !== '/api/');

const TRACKER_PARAM_PATTERNS = [
  '/*?*utm_',
  '/*?*fbclid',
  '/*?*gclid',
  '/*?*mc_cid',
  '/*?*mc_eid',
];

export default function robots(): MetadataRoute.Robots {
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
