import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // With a single locale this means every URL is unprefixed: `/news`, not
  // `/sq/news`.
  localePrefix: 'as-needed',
  alternateLinks: false,
});
