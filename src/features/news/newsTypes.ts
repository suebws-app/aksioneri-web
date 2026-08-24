import type { Locale } from '@/i18n/config';

/** Editorial desk a story belongs to. */
export type NewsCategory =
  'macro' | 'stocks' | 'europe' | 'crypto' | 'commodities' | 'economy';

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  /** One-sentence standfirst shown in listings. */
  summary: string;
  /** Minutes since publication, formatted into "2 h ago" at render time. */
  minutesAgo: number;
  readingMinutes: number;
  /** Ticker badge shown beside the meta line, when the story has one. */
  ticker?: { symbol: string; changePercent: number };
  /** The plain-language "why it matters" note, when the story carries one. */
  whyItMatters?: string;
  /** Body paragraphs, for the article page. */
  body?: string[];

  /** Everything below is present only on fully-written stories. */
  author?: { name: string; desk: string; initials: string };
  /** ISO instant of publication. */
  publishedAt?: string;
  heroCaption?: string;
  /** Body sections that follow the opening paragraphs. */
  sections?: { heading: string; paragraphs: string[] }[];
  /** The "In numbers" strip: four figures with captions. */
  inNumbers?: { value: string; label: string; tone?: 'positive' | 'neutral' }[];
  pullQuote?: { quote: string; attribution: string };
  /** Jargon defined at the foot of the story. */
  terms?: { term: string; definition: string }[];
  /** Instruments the story discusses, by market symbol. */
  mentionedSymbols?: string[];
  /** Calendar event the story hangs on. */
  relatedEventSlug?: string;
  /** Lesson recommended alongside the story. */
  relatedLessonSlug?: string;
}

export type Localized<T> = Record<Locale, T>;
