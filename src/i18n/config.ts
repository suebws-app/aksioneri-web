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
