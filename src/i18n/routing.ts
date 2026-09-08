import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';
import { PATHNAMES } from './pathnames';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  alternateLinks: false,
  pathnames: PATHNAMES,
});
