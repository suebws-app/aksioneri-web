export const locales = ['sq'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sq';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const openGraphLocales: Record<Locale, string> = {
  sq: 'sq_AL',
};

export const formattingLocales: Record<Locale, string> = {
  sq: 'sq-AL',
};
