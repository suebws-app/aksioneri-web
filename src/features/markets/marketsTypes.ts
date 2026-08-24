import type { Locale } from '@/i18n/config';

export interface Quote {
  /** Stable key and route segment, e.g. `sp-500`. */
  symbol: string;
  name: string;
  /** Formatted for display — precision varies by instrument (2 dp, 4 dp, none). */
  price: string;
  /** Percentage change on the session. Negative renders red. */
  changePercent: number;
}

export interface Mover {
  name: string;
  changePercent: number;
}

export interface MarketMovers {
  gainers: Mover[];
  losers: Mover[];
  mostWatched: string[];
}

export type Localized<T> = Record<Locale, T>;

/** A constituent of an index, with its weight and day move. */
export interface Holding {
  name: string;
  /** Share of the index, as a percentage. */
  weight: number;
  changePercent: number;
}

export interface SectorMove {
  name: string;
  changePercent: number;
}

/**
 * The full instrument page. Fields below the identifiers are optional: only
 * well-covered instruments carry an explainer and a holdings breakdown.
 */
export interface AssetDetail {
  symbol: string;
  /** Exchange ticker shown in the badge, e.g. "SPX". */
  ticker: string;
  name: string;
  /** e.g. "US · index · 500 companies". */
  descriptor: string;
  /** Breadcrumb category, e.g. "Indices". */
  category: string;
  price: string;
  changePercent: number;
  /** Absolute move, pre-formatted ("+52.10"). */
  changeAbsolute: string;
  /** e.g. "Closed · 21 Aug 2026, 16:00 ET · delayed 15 min". */
  statusLine: string;
  series: number[];
  sessionTimes: string[];
  /** The six-cell statistics grid. */
  statistics: {
    label: string;
    value: string;
    tone?: 'positive' | 'negative';
  }[];

  explainer?: {
    heading: string;
    paragraphs: string[];
    callout: {
      heading: string;
      body: string;
      lessonSlug: string;
      linkLabel: string;
    };
  };
  holdings?: Holding[];
  sectors?: SectorMove[];
  /** Calendar events that typically move it. */
  eventSlugs?: string[];
  /** Lessons to read first. */
  lessonSlugs?: string[];
}
