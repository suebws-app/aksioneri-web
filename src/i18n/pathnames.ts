import type { Locale } from './config';

export const PATHNAMES = {
  '/': '/',
  '/markets': { sq: '/tregjet' },
  '/markets/[symbol]': { sq: '/tregjet/[symbol]' },
  '/news': { sq: '/lajme' },
  '/news/[slug]': { sq: '/lajme/[slug]' },
  '/learn': { sq: '/meso' },
  '/learn/[slug]': { sq: '/meso/[slug]' },
  '/learn/glossary': { sq: '/meso/fjalorthi' },
  '/calculators': { sq: '/kalkulatoret' },
  '/calculators/compound-interest': {
    sq: '/kalkulatoret/interesi-i-perbere',
  },
  '/calculators/cagr': { sq: '/kalkulatoret/cagr' },
  '/calculators/mortgage': { sq: '/kalkulatoret/hipoteka' },
  '/calculators/inflation-adjustment': {
    sq: '/kalkulatoret/pershtatja-me-inflacionin',
  },
  '/calculators/loan-amortization': {
    sq: '/kalkulatoret/amortizimi-i-kredis',
  },
  '/calculators/dividend-reinvestment': {
    sq: '/kalkulatoret/riinvestimi-i-dividenteve',
  },
  '/calculators/dollar-cost-averaging': {
    sq: '/kalkulatoret/mesatarizimi-i-kostove',
  },
  '/calculators/percentage-return': {
    sq: '/kalkulatoret/kthimi-ne-perqindje',
  },
  '/calculators/retirement': { sq: '/kalkulatoret/pensioni' },
  '/calculators/currency-converter': {
    sq: '/kalkulatoret/konvertuesi-i-monedhave',
  },
  '/calculators/stock-profit': {
    sq: '/kalkulatoret/fitimi-nga-aksionet',
  },
  '/calculators/[slug]': { sq: '/kalkulatoret/[slug]' },
  '/calendar': { sq: '/kalendari' },
  '/calendar/[slug]': { sq: '/kalendari/[slug]' },
  '/about': { sq: '/rreth' },
  '/contact': { sq: '/kontakt' },
  '/privacy': { sq: '/privatesia' },
  '/terms': { sq: '/kushtet' },
  '/search': { sq: '/kerko' },
  '/sign-in': { sq: '/hyr' },
  '/sign-up': { sq: '/regjistrohu' },
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
