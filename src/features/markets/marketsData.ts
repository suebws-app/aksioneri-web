import type { Locale } from '@/i18n/config';
import type {
  IndexSnapshot,
  Localized,
  MarketMovers,
  Quote,
} from './marketsTypes';

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
    name: { sq: 'S&P 500', en: 'S&P 500' },
    price: '6,421.20',
    changePercent: 0.82,
  },
  {
    symbol: 'nasdaq-100',
    name: { sq: 'Nasdaq 100', en: 'Nasdaq 100' },
    price: '21,384.50',
    changePercent: 1.14,
  },
  {
    symbol: 'dow-jones',
    name: { sq: 'Dow Jones', en: 'Dow Jones' },
    price: '44,912.10',
    changePercent: 0.31,
  },
  {
    symbol: 'stoxx-600',
    name: { sq: 'STOXX Europe 600', en: 'STOXX Europe 600' },
    price: '571.40',
    changePercent: 0.58,
  },
  {
    symbol: 'bitcoin',
    name: { sq: 'Bitcoin', en: 'Bitcoin' },
    price: '98,240',
    changePercent: -1.42,
  },
  {
    symbol: 'gold',
    name: { sq: 'Ari', en: 'Gold' },
    price: '3,148.60',
    changePercent: 0.44,
  },
  {
    symbol: 'eur-usd',
    name: { sq: 'EUR / USD', en: 'EUR / USD' },
    price: '1.0925',
    changePercent: -0.12,
  },
];

/** The six instruments in the header strip, in the design's order. */
const TICKER_SYMBOLS = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'bitcoin',
  'gold',
  'eur-usd',
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

/**
 * Intraday series behind the sparkline, rising across the session to match the
 * design's shape.
 */
const SP500_SERIES = [
  6362, 6354, 6360, 6346, 6352, 6341, 6348, 6357, 6351, 6364, 6372, 6366, 6379,
  6373, 6384, 6378, 6391, 6399, 6393, 6404, 6398, 6411, 6417, 6409, 6420, 6426,
  6418, 6432, 6424, 6438, 6446, 6439, 6450, 6444, 6457, 6463, 6455, 6468, 6462,
  6474, 6480,
];

const resolveQuote = (quote: SeedQuote, locale: Locale): Quote => ({
  symbol: quote.symbol,
  name: quote.name[locale],
  price: quote.price,
  changePercent: quote.changePercent,
});

export const getQuotes = (locale: Locale): Quote[] =>
  QUOTES.map((quote) => resolveQuote(quote, locale));

export const getTickerQuotes = (locale: Locale): Quote[] =>
  TICKER_SYMBOLS.map((symbol) => {
    const quote = QUOTES.find((entry) => entry.symbol === symbol);
    if (!quote) throw new Error(`Unknown ticker symbol: ${symbol}`);
    return resolveQuote(quote, locale);
  });

export const getMovers = (): MarketMovers => MOVERS;

export const getLeadIndex = (locale: Locale): IndexSnapshot => {
  const quote = QUOTES.find((entry) => entry.symbol === 'sp-500');
  if (!quote) throw new Error('Lead index missing from seed data');

  return {
    symbol: quote.symbol,
    name: quote.name[locale],
    price: quote.price,
    changePercent: quote.changePercent,
    series: SP500_SERIES,
    sessionTimes: ['09:30', '12:00', '16:00'],
  };
};

export const getQuote = (locale: Locale, symbol: string): Quote | null => {
  const quote = QUOTES.find((entry) => entry.symbol === symbol);
  return quote ? resolveQuote(quote, locale) : null;
};

/** The timestamp the design shows beside "What matters today". */
export const MARKET_TIMESTAMP = '2026-08-21T16:42:00Z';
