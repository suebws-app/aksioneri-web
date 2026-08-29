import { defaultLocale, type Locale } from '@/i18n/config';
import { localizePathname } from '@/i18n/pathnames';
import { clientEnv } from '@/lib/utils/env.client';

export const appUrl = clientEnv.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');

export const localizePath = (locale: Locale, path: string): string => {
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
};

export const absoluteUrl = (path: string): string =>
  path === '/' ? appUrl : `${appUrl}${path}`;

export const localizedAbsoluteUrl = (locale: Locale, path: string): string =>
  absoluteUrl(localizePath(locale, localizePathname(locale, path)));
