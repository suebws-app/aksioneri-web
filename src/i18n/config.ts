export const locales = ['sq'] as const;

export type Locale = (typeof locales)[number];

/**
 * Albanian is the only locale.
 *
 * The site shipped bilingual, with `en` as a prefixed secondary locale. It was
 * removed: the audience is Albanian-speaking, and a half-maintained second
 * language is worse than one. The `[locale]` route segment and next-intl stay
 * — messages still come from a catalogue, and dates still format through
 * `Intl` — but there is exactly one value to resolve.
 */
export const defaultLocale: Locale = 'sq';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Maps our locale code to the region-qualified code Open Graph expects. */
export const openGraphLocales: Record<Locale, string> = {
  sq: 'sq_AL',
};

/**
 * BCP-47 tag used for date and number formatting. A bare `sq` would resolve to
 * a default that gets the weekday-and-day order wrong; `sq-AL` gives the
 * natural Albanian form, "hën, 17".
 */
export const formattingLocales: Record<Locale, string> = {
  sq: 'sq-AL',
};
