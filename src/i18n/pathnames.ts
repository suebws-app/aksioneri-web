import type { Locale } from './config';

export const PATHNAMES = {
  '/': '/',
  '/markets': { en: '/markets', sq: '/tregjet' },
  '/markets/[symbol]': {
    en: '/markets/[symbol]',
    sq: '/tregjet/[symbol]',
  },
  '/markets/[symbol]/financials': {
    en: '/markets/[symbol]/financials',
    sq: '/tregjet/[symbol]/financat',
  },
  '/markets/[symbol]/valuation': {
    en: '/markets/[symbol]/valuation',
    sq: '/tregjet/[symbol]/vleresimi',
  },
  '/markets/[symbol]/dividends': {
    en: '/markets/[symbol]/dividends',
    sq: '/tregjet/[symbol]/dividendat',
  },
  '/markets/[symbol]/news': {
    en: '/markets/[symbol]/news',
    sq: '/tregjet/[symbol]/lajmet',
  },
  '/markets/[symbol]/filings': {
    en: '/markets/[symbol]/filings',
    sq: '/tregjet/[symbol]/raportet',
  },
  '/news': { en: '/news', sq: '/lajme' },
  '/news/[slug]': { en: '/news/[slug]', sq: '/lajme/[slug]' },
  '/learn': { en: '/learn', sq: '/meso' },
  '/learn/[slug]': { en: '/learn/[slug]', sq: '/meso/[slug]' },
  '/learn/glossary': {
    en: '/learn/glossary',
    sq: '/meso/fjalorthi',
  },
  '/calculators': { en: '/calculators', sq: '/kalkulatoret' },
  '/calculators/compound-interest': {
    en: '/calculators/compound-interest',
    sq: '/kalkulatoret/interesi-i-perbere',
  },
  '/calculators/cagr': {
    en: '/calculators/cagr',
    sq: '/kalkulatoret/cagr',
  },
  '/calculators/mortgage': {
    en: '/calculators/mortgage',
    sq: '/kalkulatoret/hipoteka',
  },
  '/calculators/inflation-adjustment': {
    en: '/calculators/inflation-adjustment',
    sq: '/kalkulatoret/pershtatja-me-inflacionin',
  },
  '/calculators/loan-amortization': {
    en: '/calculators/loan-amortization',
    sq: '/kalkulatoret/amortizimi-i-kredis',
  },
  '/calculators/dividend-reinvestment': {
    en: '/calculators/dividend-reinvestment',
    sq: '/kalkulatoret/riinvestimi-i-dividenteve',
  },
  '/calculators/dollar-cost-averaging': {
    en: '/calculators/dollar-cost-averaging',
    sq: '/kalkulatoret/mesatarizimi-i-kostove',
  },
  '/calculators/percentage-return': {
    en: '/calculators/percentage-return',
    sq: '/kalkulatoret/kthimi-ne-perqindje',
  },
  '/calculators/retirement': {
    en: '/calculators/retirement',
    sq: '/kalkulatoret/pensioni',
  },
  '/calculators/currency-converter': {
    en: '/calculators/currency-converter',
    sq: '/kalkulatoret/konvertuesi-i-monedhave',
  },
  '/calculators/stock-profit': {
    en: '/calculators/stock-profit',
    sq: '/kalkulatoret/fitimi-nga-aksionet',
  },
  '/calculators/[slug]': {
    en: '/calculators/[slug]',
    sq: '/kalkulatoret/[slug]',
  },
  '/calendar': { en: '/calendar', sq: '/kalendari' },
  '/calendar/[slug]': {
    en: '/calendar/[slug]',
    sq: '/kalendari/[slug]',
  },
  '/about': { en: '/about', sq: '/rreth' },
  '/contact': { en: '/contact', sq: '/kontakt' },
  '/privacy': { en: '/privacy', sq: '/privatesia' },
  '/terms': { en: '/terms', sq: '/kushtet' },
  '/search': { en: '/search', sq: '/kerko' },
  '/sign-in': { en: '/sign-in', sq: '/hyr' },
  '/sign-up': { en: '/sign-up', sq: '/regjistrohu' },
} as const satisfies Record<string, string | Record<Locale, string>>;

export type CanonicalPathname = keyof typeof PATHNAMES;

export interface MatchedPathname {
  pattern: CanonicalPathname;
  params: Record<string, string>;
}

export function matchPathname(canonical: string): MatchedPathname | null {
  if (canonical in PATHNAMES) {
    return { pattern: canonical as CanonicalPathname, params: {} };
  }

  const canonSegments = canonical.split('/');
  for (const key of Object.keys(PATHNAMES) as CanonicalPathname[]) {
    if (!key.includes('[')) continue;
    const patternSegments = key.split('/');
    if (patternSegments.length !== canonSegments.length) continue;

    const params: Record<string, string> = {};
    let matches = true;
    for (let i = 0; i < patternSegments.length; i += 1) {
      const p = patternSegments[i] ?? '';
      const c = canonSegments[i] ?? '';
      if (p.startsWith('[') && p.endsWith(']')) {
        params[p.slice(1, -1)] = c;
      } else if (p !== c) {
        matches = false;
        break;
      }
    }
    if (matches) return { pattern: key, params };
  }

  return null;
}

export function localizePathname(locale: Locale, canonical: string): string {
  const matched = matchPathname(canonical);
  if (!matched) return canonical;

  const mapping = PATHNAMES[matched.pattern];
  const localizedPattern =
    typeof mapping === 'string' ? mapping : mapping[locale];

  return localizedPattern.replace(
    /\[([^\]]+)\]/g,
    (_, key: string) => matched.params[key] ?? '',
  );
}
