import type {
  CalendarEvent,
  CalendarExplanation,
  EventDetail,
} from './calendarTypes';

export function detailFromEvent(
  event: CalendarEvent,
  regionName: string,
  cadence: string,
  releasesAt: string,
  sectionLabels?: {
    whyItMatters: string;
    howToRead: string;
  },
): EventDetail {
  const explanation = event.explanation ?? null;
  const detail: EventDetail = {
    slug: event.slug,
    title: explanation?.title ?? event.title,
    region: event.region,
    regionName,
    shortName: explanation?.title ?? event.title,
    impact: event.impact,
    cadence,
    summary: explanation?.summary ?? '',
    time: event.time,
    releasesAt,
    expected: event.expected,
    previous: event.previous,
    actual: event.actual,
  };

  if (explanation) attachExplanation(detail, explanation, sectionLabels);
  return detail;
}

function attachExplanation(
  detail: EventDetail,
  explanation: CalendarExplanation,
  sectionLabels?: { whyItMatters: string; howToRead: string },
): void {
  const whyHeading = sectionLabels?.whyItMatters ?? 'Pse ka rëndësi';
  const howHeading = sectionLabels?.howToRead ?? 'Si të lexohet';

  if (explanation.whyItMatters.length > 0) {
    detail.explainer = {
      heading: whyHeading,
      paragraphs: explanation.whyItMatters,
    };
  }
  if (explanation.howToRead.length > 0) {
    detail.howToRead = {
      heading: howHeading,
      steps: explanation.howToRead.map((entry) => ({
        title: entry.scenario,
        body: entry.implication,
      })),
    };
  }
  if (explanation.reactingAssets.length > 0) {
    detail.reactingSymbols = explanation.reactingAssets;
  }
}
