import type { Locale } from '@/i18n/config';

// The core calendar shapes now live in the API-layer (a boundaries-rule
// requirement: `lib/api` cannot depend on `features`). Re-exported here so
// the many consumers who import from `@/features/calendar` do not have to
// move — nothing but the source-of-truth location has moved.
export type {
  CalendarDay,
  CalendarEvent,
  CalendarExplanation,
  CalendarWeek,
  EventImpact,
  EventRegion,
  NextUpEvent,
  SurpriseDirection,
} from '@/lib/api/calendar';
import type {
  EventRegion,
  EventImpact,
  SurpriseDirection,
} from '@/lib/api/calendar';

/**
 * Content that differs per locale. The API will return values already resolved
 * for the requesting reader; until then the fixtures carry both and
 * `getCalendarWeek` resolves them.
 */
export type Localized<T> = Record<Locale, T>;

/**
 * The filter pills, which group regions rather than matching them one to one:
 * a German release belongs to the euro area, a Japanese one to Asia.
 */
export type RegionFilterValue = 'ALL' | 'US' | 'EU' | 'UK' | 'ASIA';

export const REGION_FILTERS: RegionFilterValue[] = [
  'ALL',
  'US',
  'EU',
  'UK',
  'ASIA',
];

const FILTER_MEMBERS: Record<
  Exclude<RegionFilterValue, 'ALL'>,
  EventRegion[]
> = {
  US: ['US'],
  EU: ['EU', 'DE'],
  UK: ['UK'],
  ASIA: ['JP'],
};

export const isRegionFilterValue = (
  value: string,
): value is RegionFilterValue => (REGION_FILTERS as string[]).includes(value);

export const matchesRegionFilter = (
  region: EventRegion,
  filter: RegionFilterValue,
): boolean => filter === 'ALL' || FILTER_MEMBERS[filter].includes(region);

/** A single reading in an indicator's release history. */
export interface EventHistoryEntry {
  /** Period label, e.g. "June 2026". */
  period: string;
  actual: string;
  expected: string;
  /** Difference from consensus, pre-formatted ("−0.1 pp") or null when in line. */
  surprise: string | null;
  surpriseDirection: SurpriseDirection;
  /** Value driving the bar chart. */
  value: number;
}

/**
 * The explainer behind a calendar row. Every field below the identifiers is
 * optional: only well-covered indicators get the full treatment, and the page
 * renders whatever exists.
 */
export interface EventDetail {
  slug: string;
  title: string;
  region: EventRegion;
  regionName: string;
  /** Short label used in the breadcrumb, e.g. "Inflation (CPI)". */
  shortName: string;
  impact: EventImpact;
  /** e.g. "Monthly · high impact". */
  cadence: string;
  summary: string;
  time: string;
  /** ISO instant of the release, for the countdown and the dateline. */
  releasesAt: string;
  expected: string | null;
  previous: string | null;
  actual: string | null;
  /** Reference level, e.g. the central bank's target. */
  benchmark?: { label: string; value: string };
  nextReleaseDate?: string;

  explainer?: { heading: string; paragraphs: string[] };
  /** Two-column "is a high number good or bad" panel. */
  directions?: {
    higher: DirectionOutcome;
    lower: DirectionOutcome;
    caveat: { heading: string; body: string };
  };
  history?: { heading: string; note: string; entries: EventHistoryEntry[] };
  /** Numbered "how to read it" guidance. */
  howToRead?: { heading: string; steps: { title: string; body: string }[] };
  /** Key-value facts in the sidebar. */
  atAGlance?: { label: string; value: string }[];
  /** Instruments that typically react, by market symbol. */
  reactingSymbols?: string[];
  /** Lessons that give the background. */
  lessonSlugs?: string[];
  /** Stories where the indicator features. */
}

export interface DirectionOutcome {
  /** Heading, e.g. "Higher than expected". */
  label: string;
  /** Verdict, e.g. "Generally bad for markets". */
  verdict: string;
  body: string;
  /** What each asset class typically does. */
  effects: {
    subject: string;
    outcome: string;
    tone: 'positive' | 'negative' | 'neutral';
  }[];
}
