import { defaultLocale, type Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';

/**
 * The single source of truth for every absolute URL the app emits — canonicals,
 * Open Graph, sitemap entries. Nothing else may hardcode a domain: one wrong
 * literal here is a sitewide SEO defect.
 */
export const appUrl = clientEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');

/**
 * Adds the locale prefix, matching `localePrefix: 'as-needed'` — the default
 * locale is served unprefixed.
 */
export const localizePath = (locale: Locale, path: string): string => {
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
};

export const absoluteUrl = (path: string): string =>
  path === '/' ? appUrl : `${appUrl}${path}`;

export const localizedAbsoluteUrl = (locale: Locale, path: string): string =>
  absoluteUrl(localizePath(locale, path));
