import { cache } from 'react';
import { apiFetch, type RequestOptions } from './client';
import { safely } from './safely';

export type StatementPeriod = 'annual' | 'quarterly';

export type LineItemUnit = 'USD' | 'USD/shares' | 'shares' | 'pure';

export interface LineItem {
  key: string;
  value: number | null;
  unit: LineItemUnit | string;
}

export interface StatementPeriodData {
  fiscalYear: number;
  fiscalPeriod: string;
  endDate: string;
  filedAt: string | null;
  form: string;
  items: LineItem[];
}

export interface StatementResponse {
  ticker: string;
  name: string;
  currency: string;
  period: StatementPeriod;
  periods: StatementPeriodData[];
  source: string;
  fetchedAt: string;
}

export interface Filing {
  accessionNumber: string;
  form: string;
  filedAt: string;
  reportDate: string | null;
  url: string;
  description: string | null;
}

export interface FilingsResponse {
  ticker: string;
  name: string;
  filings: Filing[];
  source: string;
  fetchedAt: string;
}

const REVALIDATE_SECONDS = 60 * 60;

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: ['fundamentals'] },
};

const SCOPE = 'fundamentals';

const emptyStatement = (
  ticker: string,
  period: StatementPeriod,
): StatementResponse => ({
  ticker: ticker.toUpperCase(),
  name: ticker.toUpperCase(),
  currency: 'USD',
  period,
  periods: [],
  source: 'SEC EDGAR',
  fetchedAt: new Date().toISOString(),
});

const emptyFilings = (ticker: string): FilingsResponse => ({
  ticker: ticker.toUpperCase(),
  name: ticker.toUpperCase(),
  filings: [],
  source: 'SEC EDGAR',
  fetchedAt: new Date().toISOString(),
});

export const getIncomeStatement = cache(
  async (
    ticker: string,
    period: StatementPeriod = 'annual',
    limit = 8,
  ): Promise<StatementResponse> =>
    safely(
      () =>
        apiFetch<StatementResponse>(
          `fundamentals/${encodeURIComponent(ticker)}/income-statement`,
          { searchParams: { period, limit }, ...cacheOptions },
        ),
      emptyStatement(ticker, period),
      SCOPE,
    ),
);

export const getBalanceSheet = cache(
  async (
    ticker: string,
    period: StatementPeriod = 'annual',
    limit = 8,
  ): Promise<StatementResponse> =>
    safely(
      () =>
        apiFetch<StatementResponse>(
          `fundamentals/${encodeURIComponent(ticker)}/balance-sheet`,
          { searchParams: { period, limit }, ...cacheOptions },
        ),
      emptyStatement(ticker, period),
      SCOPE,
    ),
);

export const getCashFlow = cache(
  async (
    ticker: string,
    period: StatementPeriod = 'annual',
    limit = 8,
  ): Promise<StatementResponse> =>
    safely(
      () =>
        apiFetch<StatementResponse>(
          `fundamentals/${encodeURIComponent(ticker)}/cash-flow`,
          { searchParams: { period, limit }, ...cacheOptions },
        ),
      emptyStatement(ticker, period),
      SCOPE,
    ),
);

export const fetchIncomeStatement = (
  ticker: string,
  period: StatementPeriod,
  limit: number,
): Promise<StatementResponse> =>
  apiFetch<StatementResponse>(
    `fundamentals/${encodeURIComponent(ticker)}/income-statement`,
    { searchParams: { period, limit } },
  );

export const fetchBalanceSheet = (
  ticker: string,
  period: StatementPeriod,
  limit: number,
): Promise<StatementResponse> =>
  apiFetch<StatementResponse>(
    `fundamentals/${encodeURIComponent(ticker)}/balance-sheet`,
    { searchParams: { period, limit } },
  );

export const fetchCashFlow = (
  ticker: string,
  period: StatementPeriod,
  limit: number,
): Promise<StatementResponse> =>
  apiFetch<StatementResponse>(
    `fundamentals/${encodeURIComponent(ticker)}/cash-flow`,
    { searchParams: { period, limit } },
  );

export const getFilings = cache(
  async (
    ticker: string,
    limit = 20,
    form?: '10-K' | '10-Q' | '8-K',
  ): Promise<FilingsResponse> =>
    safely(
      () =>
        apiFetch<FilingsResponse>(
          `fundamentals/${encodeURIComponent(ticker)}/filings`,
          { searchParams: { limit, form }, ...cacheOptions },
        ),
      emptyFilings(ticker),
      SCOPE,
    ),
);

export function hasFundamentals(category: string): boolean {
  return category === 'stock';
}

export interface Valuation {
  ticker: string;
  currency: string | null;
  price: number | null;
  marketCap: number | null;
  enterpriseValue: number | null;
  peRatio: number | null;
  forwardPeRatio: number | null;
  pegRatio: number | null;
  priceToSales: number | null;
  priceToBook: number | null;
  evToRevenue: number | null;
  evToEbitda: number | null;
  beta: number | null;
  profitMargin: number | null;
  operatingMargin: number | null;
  returnOnEquity: number | null;
  returnOnAssets: number | null;
  revenueGrowth: number | null;
  earningsGrowth: number | null;
  debtToEquity: number | null;
  fiftyTwoWeekLow: number | null;
  fiftyTwoWeekHigh: number | null;
  source: string;
  fetchedAt: string;
}

export interface DividendEvent {
  date: string;
  amount: number;
}

export interface Dividends {
  ticker: string;
  currency: string | null;
  dividendYield: number | null;
  trailingAnnualRate: number | null;
  payoutRatio: number | null;
  fiveYearAvgYield: number | null;
  exDividendDate: string | null;
  nextPaymentDate: string | null;
  history: DividendEvent[];
  source: string;
  fetchedAt: string;
}

const emptyValuation = (ticker: string): Valuation => ({
  ticker: ticker.toUpperCase(),
  currency: null,
  price: null,
  marketCap: null,
  enterpriseValue: null,
  peRatio: null,
  forwardPeRatio: null,
  pegRatio: null,
  priceToSales: null,
  priceToBook: null,
  evToRevenue: null,
  evToEbitda: null,
  beta: null,
  profitMargin: null,
  operatingMargin: null,
  returnOnEquity: null,
  returnOnAssets: null,
  revenueGrowth: null,
  earningsGrowth: null,
  debtToEquity: null,
  fiftyTwoWeekLow: null,
  fiftyTwoWeekHigh: null,
  source: 'Yahoo Finance',
  fetchedAt: new Date().toISOString(),
});

const emptyDividends = (ticker: string): Dividends => ({
  ticker: ticker.toUpperCase(),
  currency: null,
  dividendYield: null,
  trailingAnnualRate: null,
  payoutRatio: null,
  fiveYearAvgYield: null,
  exDividendDate: null,
  nextPaymentDate: null,
  history: [],
  source: 'Yahoo Finance',
  fetchedAt: new Date().toISOString(),
});

export const getValuation = cache(async (ticker: string): Promise<Valuation> =>
  safely(
    () =>
      apiFetch<Valuation>(
        `fundamentals/${encodeURIComponent(ticker)}/valuation`,
        cacheOptions,
      ),
    emptyValuation(ticker),
    SCOPE,
  ),
);

export interface AiSummaryBullet {
  headline: string;
}

export interface AiSummaryWatchItem {
  label: string;
  when: string;
}

export interface AiSummary {
  ticker: string;
  locale: string;
  outlook: 'positive' | 'neutral' | 'cautious';
  confidence: 'low' | 'moderate' | 'high';
  tldr: string;
  followup: string;
  positives: AiSummaryBullet[];
  risks: AiSummaryBullet[];
  watchNext: AiSummaryWatchItem[];
  whatHappened: string | null;
  whyMoving: string | null;
  assessmentGuide: string | null;
  changingView: AiSummaryBullet[];
  model: string;
  generatedAt: string;
  expiresAt: string;
}

export const getAiSummary = cache(
  async (ticker: string, locale: string): Promise<AiSummary | null> =>
    safely(
      () =>
        apiFetch<AiSummary>(
          `fundamentals/${encodeURIComponent(ticker)}/ai-summary`,
          {
            searchParams: { locale },
            cache: 'no-store',
          },
        ),
      null,
      SCOPE,
    ),
);

export function generateAiSummary(
  ticker: string,
  locale: string,
): Promise<AiSummary> {
  return apiFetch<AiSummary>(
    `fundamentals/${encodeURIComponent(ticker)}/ai-summary/generate`,
    {
      method: 'POST',
      searchParams: { locale },
      cache: 'no-store',
    },
  );
}

export const getDividends = cache(async (ticker: string): Promise<Dividends> =>
  safely(
    () =>
      apiFetch<Dividends>(
        `fundamentals/${encodeURIComponent(ticker)}/dividends`,
        cacheOptions,
      ),
    emptyDividends(ticker),
    SCOPE,
  ),
);
