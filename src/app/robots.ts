import type { MetadataRoute } from 'next';
import { appUrl } from '@/lib/seo/urls';

/**
 * Paths that must be disallowed under EVERY locale prefix. With
 * `localePrefix: 'as-needed'` the default locale is unprefixed (`/dashboard`)
 * while others carry a prefix (`/en/dashboard`), so each entry is emitted in
 * both forms — otherwise a crawler reaches private surface through the prefix.
 */
const PRIVATE_PATHS = [
  '/api/',
  '/dashboard',
  '/account',
  '/settings',
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/verify-email',
];

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
