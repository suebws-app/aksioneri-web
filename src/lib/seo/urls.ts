import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';

/**
 * The single source of truth for every absolute URL the app emits — canonicals,
 * hreflang alternates, Open Graph, sitemap entries. Nothing else may hardcode a
 * domain: one wrong literal here is a sitewide SEO defect.
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

/**
 * hreflang map for a page. `x-default` points at the default locale, which is
 * what Google serves to users whose language matches none of ours.
 */
export const buildLanguageAlternates = (
  path: string,
): Record<string, string> => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, localizedAbsoluteUrl(locale, path)]),
  ),
  'x-default': localizedAbsoluteUrl(defaultLocale, path),
});
