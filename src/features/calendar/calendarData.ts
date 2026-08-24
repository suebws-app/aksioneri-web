import type { Locale } from '@/i18n/config';
import type {
  CalendarEvent,
  CalendarWeek,
  EventImpact,
  EventRegion,
  Localized,
  NextUpEvent,
  SurpriseDirection,
} from './calendarTypes';

/**
 * Seed content taken from the design.
 *
 * Event titles and explainers are *data*, not interface copy, so they live here
 * rather than in the message catalogues — the same split the API will use once
 * `/calendar` exists there. Each localised string carries both languages
 * because a real endpoint would resolve them from the reader's
 * `preferredLanguage`; `getCalendarWeek(locale)` does that resolution here.
 *
 * Replacing this file with a call to `calendarApi.week()` is the only change
 * needed when the API module lands — nothing above it touches these shapes.
 */

interface SeedEvent {
  id: string;
  slug: string;
  time: string;
  region: EventRegion;
  title: Localized<string>;
  impact: EventImpact;
  actual?: string;
  expected?: string;
  previous?: string;
  surprise?: SurpriseDirection;
  isNextUp?: boolean;
}

interface SeedDay {
  date: string;
  events: SeedEvent[];
}

const WEEK: SeedDay[] = [
  { date: '2026-08-17', events: [] },
  { date: '2026-08-18', events: [] },
  { date: '2026-08-19', events: [] },
  { date: '2026-08-20', events: [] },
  {
    date: '2026-08-21',
    events: [
      {
        id: 'de-ppi-jul',
        slug: 'de-producer-price-index-july',
        time: '08:00',
        region: 'DE',
        title: {
          sq: 'Indeksi i çmimeve të prodhimit (PPI), korrik',
          en: 'Producer price index (PPI), July',
        },
        impact: 'low',
        actual: '1.4%',
        expected: '1.5%',
        previous: '1.6%',
        surprise: 'below',
      },
      {
        id: 'eu-consumer-confidence',
        slug: 'euro-area-consumer-confidence-flash',
        time: '10:00',
        region: 'EU',
        title: {
          sq: 'Besimi i konsumatorit në eurozonë, paraprak',
          en: 'Euro-area consumer confidence, flash',
        },
        impact: 'medium',
        actual: '−14.2',
        expected: '−13.8',
        previous: '−13.9',
        surprise: 'above',
      },
      {
        id: 'ecb-rate-decision',
        slug: 'ecb-interest-rate-decision',
        time: '13:45',
        region: 'EU',
        title: {
          sq: 'Vendimi i BQE-së për normën e interesit',
          en: 'ECB interest-rate decision',
        },
        impact: 'high',
        expected: '3.25%',
        previous: '3.50%',
      },
      {
        id: 'us-cpi-jul',
        slug: 'us-inflation-cpi-july',
        time: '14:30',
        region: 'US',
        title: {
          sq: 'Të dhënat e inflacionit (CPI), korrik',
          en: 'Inflation data (CPI), July',
        },
        impact: 'high',
        expected: '3.1%',
        previous: '3.2%',
        isNextUp: true,
      },
      {
        id: 'us-jobless-claims',
        slug: 'us-initial-jobless-claims-weekly',
        time: '14:30',
        region: 'US',
        title: {
          sq: 'Kërkesat fillestare për papunësi, javore',
          en: 'Initial jobless claims, weekly',
        },
        impact: 'medium',
        expected: '221k',
        previous: '218k',
      },
      {
        id: 'us-existing-home-sales',
        slug: 'us-existing-home-sales-july',
        time: '16:00',
        region: 'US',
        title: {
          sq: 'Shitjet e banesave ekzistuese, korrik',
          en: 'Existing home sales, July',
        },
        impact: 'low',
        expected: '4.02m',
        previous: '3.96m',
      },
      {
        id: 'fed-speech-waller',
        slug: 'fed-speech-governor-waller',
        time: '19:00',
        region: 'US',
        title: {
          sq: 'Fjalim i Fed-it · Guvernatori Waller',
          en: 'Fed speech · Governor Waller',
        },
        impact: 'medium',
      },
    ],
  },
  {
    date: '2026-08-24',
    events: [
      {
        id: 'de-ifo-aug',
        slug: 'de-ifo-business-climate-august',
        time: '10:00',
        region: 'DE',
        title: {
          sq: 'Indeksi Ifo i klimës së biznesit, gusht',
          en: 'Ifo business climate index, August',
        },
        impact: 'medium',
        expected: '88.4',
        previous: '87.9',
      },
      {
        id: 'us-durable-goods',
        slug: 'us-durable-goods-orders-july',
        time: '14:30',
        region: 'US',
        title: {
          sq: 'Porositë për mallra të qëndrueshme, korrik',
          en: 'Durable goods orders, July',
        },
        impact: 'low',
        expected: '0.4%',
        previous: '−0.2%',
      },
      {
        id: 'boj-minutes',
        slug: 'bank-of-japan-meeting-minutes',
        time: '01:50',
        region: 'JP',
        title: {
          sq: 'Procesverbali i mbledhjes së Bankës së Japonisë',
          en: 'Bank of Japan meeting minutes',
        },
        impact: 'low',
      },
    ],
  },
  { date: '2026-08-25', events: [] },
];

const NEXT_UP: {
  slug: string;
  title: Localized<string>;
  summary: Localized<string>;
  whyItMatters: Localized<string[]>;
  time: string;
  expected: string;
  previous: string;
  impact: EventImpact;
  minutesAway: number;
} = {
  slug: 'us-inflation-cpi-july',
  time: '14:30',
  expected: '3.1%',
  previous: '3.2%',
  impact: 'high',
  minutesAway: 132,
  title: {
    sq: 'Të dhënat e inflacionit në SHBA (CPI), korrik',
    en: 'US inflation data (CPI), July',
  },
  summary: {
    sq: 'Kjo është matja kryesore e shpejtësisë me të cilën po rriten çmimet në Shtetet e Bashkuara. Një shifër më e butë e bën uljen e normave më të mundshme.',
    en: 'This is the headline measure of how fast prices are rising in the United States. A softer number makes a rate cut more likely.',
  },
  whyItMatters: {
    sq: [
      'Inflacioni përcakton se çfarë bën Fed-i me normat e interesit. Normat më pas prekin gati gjithçka tjetër: çmimet e aksioneve, kredinë e banesës, yield-et e obligacioneve, madje edhe dollarin.',
      'Një shifër nën 3.1% do të sugjeronte se çmimet po ftohen më shpejt se pritej — zakonisht mirë për aksionet.',
    ],
    en: [
      'Inflation decides what the Fed does with interest rates. Rates then affect almost everything else: share prices, mortgages, bond yields, even the dollar.',
      'A number below 3.1% would suggest prices are cooling faster than expected — usually good for shares.',
    ],
  },
};

const resolveEvent = (event: SeedEvent, locale: Locale): CalendarEvent => ({
  id: event.id,
  slug: event.slug,
  time: event.time,
  region: event.region,
  title: event.title[locale],
  impact: event.impact,
  actual: event.actual ?? null,
  expected: event.expected ?? null,
  previous: event.previous ?? null,
  surprise: event.surprise ?? 'inline',
  isNextUp: event.isNextUp,
});

const resolveNextUp = (locale: Locale): NextUpEvent => ({
  slug: NEXT_UP.slug,
  title: NEXT_UP.title[locale],
  summary: NEXT_UP.summary[locale],
  time: NEXT_UP.time,
  expected: NEXT_UP.expected,
  previous: NEXT_UP.previous,
  impact: NEXT_UP.impact,
  minutesAway: NEXT_UP.minutesAway,
  whyItMatters: NEXT_UP.whyItMatters[locale],
});

/** The day the design presents as "today". */
export const TODAY = '2026-08-21';

export function getCalendarWeek(locale: Locale): CalendarWeek {
  return {
    days: WEEK.map((day) => ({
      date: day.date,
      events: day.events.map((event) => resolveEvent(event, locale)),
    })),
    selectedDate: TODAY,
    todayDate: TODAY,
    nextUp: resolveNextUp(locale),
  };
}
