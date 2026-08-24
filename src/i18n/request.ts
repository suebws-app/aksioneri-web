import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './config';
import { loadMessages } from './loadMessages';
import { routing } from './routing';

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
