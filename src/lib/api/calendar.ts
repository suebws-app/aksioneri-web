import { cache } from 'react';
import { decodeHtmlEntities } from '@/lib/utils/htmlEntities';
import { safely } from './safely';
import { apiFetch, type RequestOptions } from './client';

const safelyCalendar = <T>(work: () => Promise<T>, fallback: T): Promise<T> =>
  safely(work, fallback, 'calendar');

export type EventRegion = 'US' | 'EU' | 'DE' | 'UK' | 'JP';

export type EventImpact = 'low' | 'medium' | 'high';

export type SurpriseDirection = 'below' | 'above' | 'inline';

export interface CalendarExplanation {
  title: string;
  summary: string;
  whyItMatters: string[];
  howToRead: { scenario: string; implication: string }[];
  reactingAssets: string[];
}

export interface CalendarEvent {
  id: string;
  slug: string;
  time: string;
  region: EventRegion;
  title: string;
  impact: EventImpact;
  actual: string | null;
  expected: string | null;
  previous: string | null;
  surprise: SurpriseDirection;
  isNextUp?: boolean;
  explanation?: CalendarExplanation | null;
}

export interface CalendarDay {
  date: string;
  events: CalendarEvent[];
}

export interface NextUpEvent {
  slug: string;
  title: string;
  summary: string;
  time: string;
  expected: string;
  previous: string;
  impact: EventImpact;
  minutesAway: number;
  whyItMatters: string[];
}

export interface CalendarWeek {
  days: CalendarDay[];
  selectedDate: string;
  todayDate: string;
  nextUp: NextUpEvent | null;
}

const REVALIDATE_SECONDS = 60;

const NEXT_TAG = 'calendar';

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: [NEXT_TAG] },
};

interface ApiCalendarEvent {
  id: string;
  slug: string;
  time: string | null;
  releasesAt: string;
  region: string;
  title: string;
  impact: 'low' | 'medium' | 'high';
  actual: string | null;
  expected: string | null;
  previous: string | null;
  surprise: 'below' | 'above' | 'inline';
  isNextUp?: boolean;
  dataSource?: 'biquote';
  sourceCredit?: string;
  sourceUrl?: string | null;
  explanation?: CalendarExplanation | null;
}

interface ApiCalendarWeek {
  days: { date: string; events: ApiCalendarEvent[] }[];
  selectedDate: string;
  todayDate: string;
  nextUp: {
    slug: string;
    title: string;
    time: string | null;
    releasesAt: string;
    impact: 'low' | 'medium' | 'high';
    expected: string | null;
    previous: string | null;
  } | null;
}

const EMPTY_WEEK: CalendarWeek = {
  days: [],
  selectedDate: '',
  todayDate: '',
  nextUp: null,
};

export const getCalendarWeek = cache(
  async (
    _locale: string,
    options: { date?: string } = {},
  ): Promise<CalendarWeek> =>
    safelyCalendar(async () => {
      const response = await apiFetch<ApiCalendarWeek>('calendar/week', {
        searchParams: {
          ...(options.date ? { date: options.date } : {}),
        },
        ...cacheOptions,
      });
      return toWeek(response);
    }, EMPTY_WEEK),
);

export const getEventDetail = cache(
  async (_locale: string, slug: string): Promise<CalendarEvent | null> =>
    safelyCalendar(
      () =>
        apiFetch<ApiCalendarEvent>(`calendar/${encodeURIComponent(slug)}`, {
          ...cacheOptions,
        }).then((raw) => toEvent(raw)),
      null,
    ),
);

interface SlugEntry {
  slug: string;
  releasesAt: string;
}

export const getCalendarSlugs = cache(async (): Promise<SlugEntry[]> =>
  safelyCalendar(
    () => apiFetch<SlugEntry[]>('calendar/slugs', cacheOptions),
    [],
  ),
);

function toRegion(value: string): EventRegion {
  const known: EventRegion[] = ['US', 'EU', 'DE', 'UK', 'JP'];
  return (known as string[]).includes(value) ? (value as EventRegion) : 'US';
}

function toEvent(raw: ApiCalendarEvent): CalendarEvent {
  return {
    id: raw.id,
    slug: raw.slug,
    time: raw.time ?? '—',
    region: toRegion(raw.region),
    title: decodeHtmlEntities(raw.title),
    impact: raw.impact,
    actual: raw.actual,
    expected: raw.expected,
    previous: raw.previous,
    surprise: raw.surprise,
    ...(raw.isNextUp ? { isNextUp: true } : {}),
    ...(raw.explanation ? { explanation: raw.explanation } : {}),
  };
}

function toWeek(raw: ApiCalendarWeek): CalendarWeek {
  return {
    days: raw.days.map((d) => ({
      date: d.date,
      events: d.events.map(toEvent),
    })),
    selectedDate: raw.selectedDate,
    todayDate: raw.todayDate,
    nextUp: raw.nextUp ? toNextUp(raw.nextUp) : null,
  };
}

function toNextUp(raw: NonNullable<ApiCalendarWeek['nextUp']>): NextUpEvent {
  const releasesAt = new Date(raw.releasesAt);
  const minutesAway = Math.max(
    0,
    Math.round((releasesAt.getTime() - Date.now()) / 60_000),
  );
  return {
    slug: raw.slug,
    title: decodeHtmlEntities(raw.title),
    summary: '',
    time: raw.time ?? '—',
    expected: raw.expected ?? '—',
    previous: raw.previous ?? '—',
    impact: raw.impact,
    minutesAway,
    whyItMatters: [],
  };
}
