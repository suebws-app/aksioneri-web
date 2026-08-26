export { CalendarPage, type CalendarPageProps } from './CalendarPage';
export { TODAY } from './calendarData';
export { EventPage, type EventPageProps } from './EventPage';
// `detailFromEvent` synthesises an editorial-shape `EventDetail` from a plain
// calendar row when we do not have hand-authored explainer content for the
// slug. Kept because the API returns release data only, and the event page
// fills the rest opportunistically.
export {
  detailFromEvent,
  getEventDetail as getSeedEventDetail,
} from './eventData';
// The live getters that talk to the API. Named as before so consumers do
// not have to change imports — only add `await`.
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
