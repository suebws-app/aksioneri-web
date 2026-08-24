export const locales = ['sq', 'en'] as const;

export type Locale = (typeof locales)[number];

/** Albanian is the primary audience; English is the secondary locale. */
export const defaultLocale: Locale = 'sq';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Maps our locale codes to the region-qualified codes Open Graph expects. */
export const openGraphLocales: Record<Locale, string> = {
  sq: 'sq_AL',
  en: 'en_US',
};

/**
 * BCP-47 tags used for date and number formatting.
 *
 * Route locales are bare language codes, and a bare `en` resolves to US
 * conventions in Intl — which renders a weekday-plus-day as "17 Mon". The
 * design, and the rest of its English ("Euro area", "shares"), is British, so
 * `en` formats as en-GB. Albanian keeps its own natural order, "hën, 17".
 */
export const formattingLocales: Record<Locale, string> = {
  sq: 'sq-AL',
  en: 'en-GB',
};
