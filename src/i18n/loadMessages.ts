import type { AbstractIntlMessages } from 'next-intl';
import { defaultLocale, type Locale } from './config';

export async function loadMessages(
  locale: Locale,
): Promise<AbstractIntlMessages> {
  try {
    return (await import(`../../messages/${locale}.json`))
      .default as AbstractIntlMessages;
  } catch {
    if (locale === defaultLocale)
      throw new Error(`Missing messages for ${locale}`);
    return loadMessages(defaultLocale);
  }
}
