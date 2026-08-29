import type { Locale } from '@/i18n/config';

export interface Quote {
  symbol: string;
  name: string;
  price: string;
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

export interface Holding {
  name: string;
  weight: number;
  changePercent: number;
}

export interface SectorMove {
  name: string;
  changePercent: number;
}

export interface AssetDetail {
  symbol: string;
  ticker: string;
  name: string;
  descriptor: string;
  category: string;
  price: string;
  changePercent: number;
  changeAbsolute: string;
  statusLine: string;
  series: number[];
  sessionTimes: string[];
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
  eventSlugs?: string[];
  lessonSlugs?: string[];
}
