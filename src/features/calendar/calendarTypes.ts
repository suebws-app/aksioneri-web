import type { Locale } from '@/i18n/config';

/**
 * How much a release typically moves markets. Rendered as one, two or three
 * filled bars — the design uses it as a scanning filter rather than a precise
 * measure.
 */
export type EventImpact = 'low' | 'medium' | 'high';

/** ISO 3166-1 alpha-2, or `EU` for the euro area as a bloc. */
export type EventRegion = 'US' | 'EU' | 'DE' | 'UK' | 'JP';

/**
 * Whether a released figure landed under or over the consensus forecast.
 *
 * Deliberately *not* "good" and "bad": the same surprise is welcome for an
 * inflation print and unwelcome for a jobs print. The colour states the
 * direction, and the reader supplies the meaning.
 */
export type SurpriseDirection = 'below' | 'above' | 'inline';

export interface CalendarEvent {
  id: string;
  slug: string;
  /** Local time of the release, `HH:mm` in the reader's market timezone. */
  time: string;
  region: EventRegion;
  title: string;
  impact: EventImpact;
  /**
   * The released figure, already formatted for display, or `null` when the
   * event has not happened yet. Formatting varies per indicator (`3.1%`,
   * `221k`, `−14.2`), so the source formats it rather than the component.
   */
  actual: string | null;
  /** Consensus forecast, or `null` for events with no numeric expectation. */
  expected: string | null;
  /** The prior reading, for context on the direction of travel. */
  previous: string | null;
  surprise: SurpriseDirection;
  /** Marks the row the "next up" card refers to. At most one per week. */
  isNextUp?: boolean;
}

export interface CalendarDay {
  /** `YYYY-MM-DD`, used as the key and for building the tab label. */
  date: string;
  events: CalendarEvent[];
}

/** The expanded explainer for the release the reader will meet next. */
export interface NextUpEvent {
  slug: string;
  title: string;
  summary: string;
  time: string;
  expected: string;
  previous: string;
  impact: EventImpact;
  /** Minutes until release, formatted into "in 2 h 12 min" at render time. */
  minutesAway: number;
  /** Two short paragraphs explaining why the release matters. */
  whyItMatters: string[];
}

export interface CalendarWeek {
  days: CalendarDay[];
  /** The date whose events are currently listed — driven by `?date=`. */
  selectedDate: string;
  /**
   * The actual current date. Distinct from `selectedDate`: browsing to next
   * Monday selects that tab, but "Today" still belongs to today's.
   */
  todayDate: string;
  nextUp: NextUpEvent | null;
}

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
