export { CalendarPage, type CalendarPageProps } from './CalendarPage';
export { EventPage, type EventPageProps } from './EventPage';
// Synthesises an editorial-shape `EventDetail` from a plain calendar row.
// The API returns release data only; the event page fills the rest
// opportunistically from the `explanation` payload the API attaches to
// the by-slug endpoint.
export { detailFromEvent } from './eventData';
// The live getters that talk to the API.
export {
  getCalendarWeek,
  getEventDetail,
  getCalendarSlugs,
} from '@/lib/api/calendar';
export {
  isRegionFilterValue,
  type CalendarEvent,
  type EventDetail,
  type CalendarWeek,
  type RegionFilterValue,
} from './calendarTypes';
