import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';
import { PATHNAMES } from './pathnames';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // With a single locale this means every URL is unprefixed: `/lajme`, not
  // `/sq/lajme`.
  localePrefix: 'as-needed',
  alternateLinks: false,
  // Translates URL segments per locale. The file-system routes stay English
  // (`src/app/.../news/[slug]/page.tsx`); the middleware rewrites `/lajme/*`
  // back to `/news/*` for the router. See `pathnames.ts` for the map.
  pathnames: PATHNAMES,
});
