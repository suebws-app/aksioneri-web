import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locale as rootLocale } from 'next/root-params';
import { defaultLocale } from './config';
import { loadMessages } from './loadMessages';
import { routing } from './routing';

/**
 * Resolves the locale for the current request.
 *
 * The `[locale]` segment sits above the root layout (`app/[locale]/layout.tsx`
 * — there is deliberately no wrapping `app/layout.tsx`), which makes it a root
 * param. Reading it through `next/root-params` is not a dynamic API, so pages
 * keep static rendering without any `setRequestLocale` call.
 *
 * The explicit `locale` override — set when a caller uses
 * `getTranslations({locale})` — wins over the root param so code running
 * outside the `[locale]` tree (metadata routes, scripts) never touches root
 * params, which are unavailable there.
 */
export default getRequestConfig(async ({ locale: override }) => {
  const requested = override ?? (await rootLocale());
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
