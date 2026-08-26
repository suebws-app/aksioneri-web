import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './config';
import { loadMessages } from './loadMessages';
import { routing } from './routing';

/**
 * Resolves the locale for the current request.
 *
 * `requestLocale` is what the middleware matched on `[locale]` — it fills
 * in automatically, no `setRequestLocale` call in each page needed. The
 * ideal replacement is `next/root-params`, but that requires
 * `app/[locale]/layout.tsx` to be the actual root layout with no wrapping
 * `app/layout.tsx`; today the outer layout still exists so routes outside
 * `[locale]` (opengraph-image, not-found, global-error) can render. Until
 * that restructure, we stay on `requestLocale` and accept the deprecation
 * warning.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Merge over the default locale so a key missing from a translation renders
  // the Albanian string instead of the raw key.
  const fallback = await loadMessages(defaultLocale);
  const messages =
    locale === defaultLocale ? fallback : await loadMessages(locale);

  return { locale, messages: { ...fallback, ...messages } };
});
