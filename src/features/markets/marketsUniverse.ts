export type MarketTab =
  | 'overview'
  | 'stocks'
  | 'etfs'
  | 'crypto'
  | 'indices'
  | 'commodities'
  | 'currencies';

export const TICKER_SLUG_ALIASES: Record<string, string> = {
  'treasury-3m': '^IRX',
  'treasury-5y': '^FVX',
  'treasury-10y': '^TNX',
  'treasury-30y': '^TYX',
};

export const TICKER_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TICKER_SLUG_ALIASES).map(([slug, ticker]) => [ticker, slug]),
);

export function resolveTickerSlug(input: string): string {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  return TICKER_SLUG_ALIASES[lower] ?? trimmed;
}

export const MARKET_TABS: readonly MarketTab[] = [
  'overview',
  'stocks',
  'etfs',
  'crypto',
  'indices',
  'commodities',
  'currencies',
];

export interface UniverseEntry {
  symbol: string;
  displayName?: string;
}

export const HERO_SYMBOLS: readonly string[] = [
  'sp-500',
  'dow-jones',
  'nasdaq-100',
  '^RUT',
];

export const HERO_LABELS: Record<string, string> = {
  'sp-500': 'S&P 500',
  'dow-jones': 'Dow Jones',
  'nasdaq-100': 'NASDAQ',
  '^RUT': 'Russell 2000',
};

export const HERO_TICKERS: Record<string, string> = {
  'sp-500': 'SPX',
  'dow-jones': 'DJI',
  'nasdaq-100': 'IXIC',
  '^RUT': 'RUT',
};

const OVERVIEW_STOCKS: readonly UniverseEntry[] = [
  { symbol: 'NVDA', displayName: 'NVIDIA Corporation' },
  { symbol: 'AAPL', displayName: 'Apple Inc.' },
  { symbol: 'MSFT', displayName: 'Microsoft Corporation' },
  { symbol: 'TSLA', displayName: 'Tesla, Inc.' },
  { symbol: 'AMZN', displayName: 'Amazon.com, Inc.' },
  { symbol: 'GOOGL', displayName: 'Alphabet Inc.' },
  { symbol: 'META', displayName: 'Meta Platforms, Inc.' },
  { symbol: 'JPM', displayName: 'JPMorgan Chase & Co.' },
];

const STOCKS: readonly UniverseEntry[] = [
  { symbol: 'AAPL', displayName: 'Apple Inc.' },
  { symbol: 'MSFT', displayName: 'Microsoft Corporation' },
  { symbol: 'NVDA', displayName: 'NVIDIA Corporation' },
  { symbol: 'GOOGL', displayName: 'Alphabet Inc.' },
  { symbol: 'AMZN', displayName: 'Amazon.com, Inc.' },
  { symbol: 'META', displayName: 'Meta Platforms, Inc.' },
  { symbol: 'TSLA', displayName: 'Tesla, Inc.' },
  { symbol: 'JPM', displayName: 'JPMorgan Chase & Co.' },
  { symbol: 'LLY', displayName: 'Eli Lilly and Company' },
  { symbol: 'WMT', displayName: 'Walmart Inc.' },
  { symbol: 'XOM', displayName: 'Exxon Mobil Corporation' },
  { symbol: 'V', displayName: 'Visa Inc.' },
];

const ETFS: readonly UniverseEntry[] = [
  { symbol: 'VOO', displayName: 'Vanguard S&P 500 ETF' },
  { symbol: 'SPY', displayName: 'SPDR S&P 500 ETF Trust' },
  { symbol: 'QQQ', displayName: 'Invesco QQQ Trust' },
  { symbol: 'VTI', displayName: 'Vanguard Total Stock Market ETF' },
  { symbol: 'IEUR', displayName: 'iShares Core MSCI Europe ETF' },
  { symbol: 'XLK', displayName: 'Technology Select Sector SPDR' },
  { symbol: 'XLF', displayName: 'Financial Select Sector SPDR' },
];

const CRYPTO: readonly UniverseEntry[] = [
  { symbol: 'bitcoin' },
  { symbol: 'ethereum' },
  { symbol: 'solana' },
  { symbol: 'ripple' },
];

const INDICES: readonly UniverseEntry[] = [
  { symbol: 'sp-500' },
  { symbol: 'dow-jones' },
  { symbol: 'nasdaq-100' },
  { symbol: '^RUT', displayName: 'Russell 2000' },
  { symbol: 'ftse-100' },
  { symbol: 'dax-40' },
  { symbol: 'nikkei-225' },
  { symbol: 'hang-seng' },
];

const COMMODITIES: readonly UniverseEntry[] = [
  { symbol: 'gold' },
  { symbol: 'oil-wti' },
  { symbol: 'silver' },
  { symbol: 'natural-gas' },
  { symbol: 'oil-brent' },
];

const CURRENCIES: readonly UniverseEntry[] = [
  { symbol: 'eur-usd' },
  { symbol: 'usd-jpy' },
  { symbol: 'gbp-usd' },
  { symbol: 'usd-cad' },
  { symbol: 'aud-usd' },
];

export const UNIVERSE: Record<MarketTab, readonly UniverseEntry[]> = {
  overview: OVERVIEW_STOCKS,
  stocks: STOCKS,
  etfs: ETFS,
  crypto: CRYPTO,
  indices: INDICES,
  commodities: COMMODITIES,
  currencies: CURRENCIES,
};

export const TRENDING_CRYPTO = CRYPTO;
export const POPULAR_ETFS = ETFS.slice(0, 4);

export function normalizeTab(input: string | undefined): MarketTab {
  return MARKET_TABS.includes(input as MarketTab)
    ? (input as MarketTab)
    : 'overview';
}

const CATEGORY_TO_TAB: Record<string, MarketTab> = {
  stock: 'stocks',
  stocks: 'stocks',
  etf: 'etfs',
  etfs: 'etfs',
  crypto: 'crypto',
  indices: 'indices',
  index: 'indices',
  commodities: 'commodities',
  commodity: 'commodities',
  currencies: 'currencies',
  currency: 'currencies',
};

export function categoryToMarketTab(category: string): MarketTab {
  return CATEGORY_TO_TAB[category.toLowerCase()] ?? 'overview';
}
