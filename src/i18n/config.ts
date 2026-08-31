export const locales = ['sq', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sq';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const openGraphLocales: Record<Locale, string> = {
  sq: 'sq_AL',
  en: 'en_US',
};

export const formattingLocales: Record<Locale, string> = {
  sq: 'sq-AL',
  en: 'en-US',
};
