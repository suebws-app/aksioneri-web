import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';
import { PATHNAMES } from './pathnames';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  alternateLinks: false,
  pathnames: PATHNAMES,
});
