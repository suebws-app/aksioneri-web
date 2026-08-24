import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Default-locale URLs stay unprefixed (`/pricing`); other locales carry the
  // prefix (`/en/pricing`).
  localePrefix: 'as-needed',
  // The middleware would otherwise emit `Link: rel="alternate"` headers derived
  // from the current pathname. Pages own their alternates through
  // `buildMetadata`, which is the authoritative source — see lib/seo/metadata.ts.
  alternateLinks: false,
});
