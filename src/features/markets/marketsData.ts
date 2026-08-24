import type { Locale } from '@/i18n/config';
import type { Localized, MarketMovers, Quote } from './marketsTypes';

/**
 * Seed market data taken from the design.
 *
 * Prices are pre-formatted strings rather than numbers: precision differs per
 * instrument (two decimals for an index, four for a currency pair, none for
 * Bitcoin), and that is the data source's decision, not the component's.
 *
 * Instrument names are localised because a few differ in Albanian ("Ari" for
 * gold); tickers and index names stay as they are, since those are proper nouns
 * in every language.
 */

interface SeedQuote {
  symbol: string;
  name: Localized<string>;
  price: string;
  changePercent: number;
}

const QUOTES: SeedQuote[] = [
  {
    symbol: 'sp-500',
    name: { sq: 'S&P 500' },
    price: '6,421.20',
    changePercent: 0.82,
  },
  {
    symbol: 'nasdaq-100',
    name: { sq: 'Nasdaq 100' },
    price: '21,384.50',
    changePercent: 1.14,
  },
  {
    symbol: 'dow-jones',
    name: { sq: 'Dow Jones' },
    price: '44,912.10',
    changePercent: 0.31,
  },
  {
    symbol: 'stoxx-600',
    name: { sq: 'STOXX Europe 600' },
    price: '571.40',
    changePercent: 0.58,
  },
  {
    symbol: 'bitcoin',
    name: { sq: 'Bitcoin' },
    price: '98,240',
    changePercent: -1.42,
  },
  {
    symbol: 'gold',
    name: { sq: 'Ari' },
    price: '3,148.60',
    changePercent: 0.44,
  },
  {
    symbol: 'eur-usd',
    name: { sq: 'EUR / USD' },
    price: '1.0925',
    changePercent: -0.12,
  },
];

const MOVERS: MarketMovers = {
  gainers: [
    { name: 'NVIDIA', changePercent: 4.8 },
    { name: 'AMD', changePercent: 3.9 },
    { name: 'Tesla', changePercent: 3.1 },
    { name: 'ASML', changePercent: 2.6 },
  ],
  losers: [
    { name: 'Moderna', changePercent: -3.4 },
    { name: 'Nike', changePercent: -2.8 },
    { name: 'Intel', changePercent: -2.2 },
    { name: 'Adidas', changePercent: -1.9 },
  ],
  mostWatched: ['Apple', 'NVIDIA', 'Tesla', 'Bitcoin'],
};

const resolveQuote = (quote: SeedQuote, locale: Locale): Quote => ({
  symbol: quote.symbol,
  name: quote.name[locale],
  price: quote.price,
  changePercent: quote.changePercent,
});

export const getQuotes = (locale: Locale): Quote[] =>
  QUOTES.map((quote) => resolveQuote(quote, locale));

export const getMovers = (): MarketMovers => MOVERS;

export const getQuote = (locale: Locale, symbol: string): Quote | null => {
  const quote = QUOTES.find((entry) => entry.symbol === symbol);
  return quote ? resolveQuote(quote, locale) : null;
};

/** The timestamp the design shows beside "What matters today". */
export const MARKET_TIMESTAMP = '2026-08-21T16:42:00Z';
