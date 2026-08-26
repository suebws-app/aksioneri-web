import { cache } from 'react';
import { ApiError, apiFetch, type RequestOptions } from './client';

/**
 * The shapes the calendar surface exposes to the rest of the app.
 *
 * Lives here (in `lib/api`, not `features/calendar`) because the API-layer
 * is not allowed to depend on `features` — the boundaries rule catches it.
 * `features/calendar/calendarTypes.ts` re-exports these so downstream
 * imports keep working.
 */

/** ISO 3166-1 alpha-2, or `EU` for the euro area as a bloc. */
export type EventRegion = 'US' | 'EU' | 'DE' | 'UK' | 'JP';

export type EventImpact = 'low' | 'medium' | 'high';

export type SurpriseDirection = 'below' | 'above' | 'inline';

/**
 * Machine-generated Kosovar-Albanian explainer attached to the by-slug
 * event response. `null` when the API's explainer worker is disabled or
 * when the OpenAI call is still in flight for a cold series — the page
 * renders the release panel either way.
 */
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
  /** Local time of the release, `HH:mm` in the reader's market timezone. */
  time: string;
  region: EventRegion;
  title: string;
  impact: EventImpact;
  actual: string | null;
  expected: string | null;
  previous: string | null;
  surprise: SurpriseDirection;
  isNextUp?: boolean;
  /** Present on the by-slug endpoint only. */
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

/**
 * The live economic calendar, served by aksioneri-api's `/calendar/*`
 * endpoints (BiQuote-backed, mirrored into `calendar_events` and refreshed
 * hourly by the API's cron).
 *
 * Every function is `cache()`-wrapped so a single render — where multiple
 * pages / metadata generators call the same function — only fans out once.
 * Nothing throws on an empty wire: a cold API returns an empty week, not a
 * 500, so the calendar page renders skeletons instead of a stack trace.
 */

/** Matches the API's hourly sync cadence — shorter would only churn ISR. */
const REVALIDATE_SECONDS = 60 * 15;

const NEXT_TAG = 'calendar';

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: [NEXT_TAG] },
};

/**
 * API-shape event. Almost identical to the web `CalendarEvent`, but arrives
 * with `region: string` (the API validates it against a wider set of
 * codes than the web's five region tabs) and carries new provenance fields
 * the seed never had.
 */
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
  // Attached on the by-slug endpoint only; the week endpoint keeps the
  // list small and omits it.
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

/**
 * `apiFetch` throws `ApiError` on any non-2xx and rejects on network
 * failure. For the calendar, both cases should degrade to an empty week
 * rather than break the page — the sync job will refill on the next tick.
 */
async function safely<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return fallback;
    console.error('[calendar] request failed:', error);
    return fallback;
  }
}

/**
 * The rolling week for the calendar page and the "upcoming" strip. When the
 * caller passes a `date`, the API returns the week that contains it — the
 * page keeps the reader on their selected day without needing to slice the
 * response client-side.
 */
export const getCalendarWeek = cache(
  async (
    _locale: string,
    options: { date?: string } = {},
  ): Promise<CalendarWeek> =>
    safely(async () => {
      const response = await apiFetch<ApiCalendarWeek>('calendar/week', {
        searchParams: {
          ...(options.date ? { date: options.date } : {}),
        },
        ...cacheOptions,
      });
      return toWeek(response);
    }, EMPTY_WEEK),
);

/**
 * One event by slug. `null` when the API has never seen it — either the
 * slug is stale, or the sync has not yet ingested that release.
 */
export const getEventDetail = cache(
  async (_locale: string, slug: string): Promise<CalendarEvent | null> =>
    safely(
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

/**
 * Every slug in the rolling window, for `generateStaticParams` and the
 * sitemap. Never throws — a failure at build time must not fail `next
 * build` outright.
 */
export const getCalendarSlugs = cache(async (): Promise<SlugEntry[]> =>
  safely(() => apiFetch<SlugEntry[]>('calendar/slugs', cacheOptions), []),
);

// ────────── mapping ──────────

/**
 * The web renders only five region tabs; the API may return any country
 * the sync mapped. Anything not in the tab set falls to `US` — a
 * best-effort default so the row still shows up rather than being dropped
 * entirely.
 */
function toRegion(value: string): EventRegion {
  const known: EventRegion[] = ['US', 'EU', 'DE', 'UK', 'JP'];
  return (known as string[]).includes(value) ? (value as EventRegion) : 'US';
}

function toEvent(raw: ApiCalendarEvent): CalendarEvent {
  return {
    id: raw.id,
    slug: raw.slug,
    // The web's `CalendarEvent.time` type is `string` (no null). Non-exact
    // release timings are dashed rather than blanked, matching the seed.
    time: raw.time ?? '—',
    region: toRegion(raw.region),
    title: raw.title,
    impact: raw.impact,
    actual: raw.actual,
    expected: raw.expected,
    previous: raw.previous,
    surprise: raw.surprise,
    ...(raw.isNextUp ? { isNextUp: true } : {}),
    // Passthrough — present on the by-slug endpoint, absent on the week
    // endpoint. The page handles both.
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
    title: raw.title,
    // `NextUpEvent.summary` and `whyItMatters` are editorial fields — the
    // API never populates them. Empty strings keep the type happy; the
    // component treats empties as absent.
    summary: '',
    time: raw.time ?? '—',
    expected: raw.expected ?? '—',
    previous: raw.previous ?? '—',
    impact: raw.impact,
    minutesAway,
    whyItMatters: [],
  };
}
