import type { AbstractIntlMessages } from 'next-intl';
import { defaultLocale, type Locale } from './config';

/**
 * Loads one locale's message catalogue. Kept separate from `request.ts` so both
 * the request config and any script can use it.
 */
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
