import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locale as rootLocale } from 'next/root-params';
import { defaultLocale } from './config';
import { loadMessages } from './loadMessages';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: override }) => {
  const requested = override ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fallback = await loadMessages(defaultLocale);
  const messages =
    locale === defaultLocale ? fallback : await loadMessages(locale);

  return { locale, messages: { ...fallback, ...messages } };
});
