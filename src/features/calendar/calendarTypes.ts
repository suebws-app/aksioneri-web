import type { Locale } from '@/i18n/config';

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

export type Localized<T> = { sq: T } & Partial<Record<Locale, T>>;

export function pickLocalized<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.sq;
}

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

export interface EventHistoryEntry {
  period: string;
  actual: string;
  expected: string;
  surprise: string | null;
  surpriseDirection: SurpriseDirection;
  value: number;
}

export interface EventDetail {
  slug: string;
  title: string;
  region: EventRegion;
  regionName: string;
  shortName: string;
  impact: EventImpact;
  cadence: string;
  summary: string;
  time: string;
  releasesAt: string;
  expected: string | null;
  previous: string | null;
  actual: string | null;
  benchmark?: { label: string; value: string };
  nextReleaseDate?: string;

  explainer?: { heading: string; paragraphs: string[] };
  directions?: {
    higher: DirectionOutcome;
    lower: DirectionOutcome;
    caveat: { heading: string; body: string };
  };
  history?: { heading: string; note: string; entries: EventHistoryEntry[] };
  howToRead?: { heading: string; steps: { title: string; body: string }[] };
  atAGlance?: { label: string; value: string }[];
  reactingSymbols?: string[];
  lessonSlugs?: string[];
}

export interface DirectionOutcome {
  label: string;
  verdict: string;
  body: string;
  effects: {
    subject: string;
    outcome: string;
    tone: 'positive' | 'negative' | 'neutral';
  }[];
}
