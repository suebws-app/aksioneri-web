import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { CalendarEvent, SurpriseDirection } from '../calendarTypes';
import { ImpactBars } from './ImpactBars';

/**
 * Presentation timezone for the calendar. Kosovo sits in Europe/Belgrade
 * — that's CEST (UTC+2) during DST and CET (UTC+1) in winter, and the
 * short-name switches automatically. The API already formats each
 * event's `time` in this zone; the header just labels which zone the
 * numbers are in.
 */
const DISPLAY_TZ = 'Europe/Belgrade';

/**
 * Returns the short timezone abbreviation ("CEST" or "CET") for
 * Europe/Belgrade at the current instant. Uses `Intl.DateTimeFormat`'s
 * `timeZoneName: 'short'` output, which returns the localised long
 * form ("Ora verore e Evropës Qendrore") for `sq`. Force English for
 * this call — the abbreviation is a universal timezone label and reads
 * cleaner as CEST/CET in every locale.
 */
function currentZoneAbbreviation(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: DISPLAY_TZ,
    timeZoneName: 'short',
  }).formatToParts(new Date());
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'CET';
}

/**
 * A real `<table>` rather than the design's grid of divs: this is tabular data,
 * and a screen reader should announce "Expected, 3.1%" rather than a bare
 * number. The visual result is identical.
 *
 * One deliberate deviation — the design makes the highlighted next-up row a
 * single full-row anchor, which is not valid inside a table row. Every row
 * links from its event title instead, which also leaves the figures selectable.
 *
 * Two renderings of the same events. From `sm` up it is the table above,
 * scrolling sideways in its own container when the viewport is narrower than
 * its natural width. On a phone that scroll hid everything that matters: the
 * table needs 860px, so a 375px screen showed time, region and title and left
 * actual, expected and previous off-screen.
 *
 * The phone layout stacks each release instead — but keeps the three figures
 * in one row, because a release is read by comparing actual against expected
 * and that comparison needs them side by side.
 */

const SURPRISE_COLOR: Record<SurpriseDirection, string> = {
  below: 'text-positive',
  above: 'text-negative',
  inline: 'text-ink-secondary',
};

interface EventTableProps {
  events: CalendarEvent[];
  /** Accessible name for the table, e.g. "Events on Friday 21 August". */
  caption: string;
  /**
   * When true, the header row is drawn visually. Default is `true` so
   * every day's table carries its own column labels — a reader
   * scrolling to Friday should not have to remember what "Aktuale"
   * meant from the top of the page. Set `false` on tables rendered
   * immediately below another with the same columns.
   */
  showColumnHeaders?: boolean;
  /**
   * The selected day sits on white with a hairline rule; later days sit on the
   * paper ground under a dark rule, which is what separates one day from the
   * next without a heavier heading.
   */
  variant?: 'selected' | 'upcoming';
}

function ValueCell({
  value,
  className,
  notReleasedLabel,
}: {
  value: string | null;
  className: string;
  notReleasedLabel: string;
}) {
  return (
    <td
      className={cn(
        'py-3.5 text-right font-mono',
        value ? className : 'text-ink-ghost',
      )}
    >
      {value ?? (
        <>
          <span aria-hidden>—</span>
          <span className="sr-only">{notReleasedLabel}</span>
        </>
      )}
    </td>
  );
}

export function EventTable({
  events,
  caption,
  showColumnHeaders = true,
  variant = 'selected',
}: EventTableProps) {
  const t = useTranslations('calendar');

  if (events.length === 0) return null;

  const notReleased = t('notReleased');
  // "Ora (CEST)" / "Ora (CET)" — the API formats every `time` in
  // Europe/Belgrade; labelling the column tells the reader which zone
  // they are looking at without having to check the dateline.
  const timeLabel = `${t('columns.time')} (${currentZoneAbbreviation()})`;

  // `relative` on the scroll container is load-bearing: `sr-only` positions
  // absolutely, and with no positioned ancestor those boxes resolve against the
  // page and widen the document, giving the whole page a horizontal scrollbar.
  const figures = (event: CalendarEvent) => [
    {
      label: t('columns.actual'),
      value: event.actual,
      className: SURPRISE_COLOR[event.surprise],
    },
    {
      label: t('columns.expected'),
      value: event.expected,
      className: 'text-ink-secondary',
    },
    {
      label: t('columns.previous'),
      value: event.previous,
      className: 'text-ink-ghost',
    },
  ];

  return (
    <>
      <ul className="sm:hidden">
        {events.map((event) => (
          <li
            key={event.id}
            className={cn(
              'border-line border-t px-3 py-3.5 last:border-b',
              event.isNextUp ? 'bg-surface-tint' : 'bg-transparent',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/calendar/${event.slug}`}
                className={cn(
                  'text-ink hover:text-accent text-[15px]',
                  event.isNextUp && 'font-medium',
                )}
              >
                {event.title}
              </Link>
              <ImpactBars impact={event.impact} />
            </div>

            <p className="text-ink-subtle mt-1 font-mono text-[12px]">
              <time className={event.isNextUp ? 'text-accent' : undefined}>
                {event.time}
              </time>
              <span className="text-accent"> · {event.region}</span>
              {event.isNextUp ? (
                <span className="text-accent"> · {t('nextUp.label')}</span>
              ) : null}
            </p>

            <dl className="mt-2.5 grid grid-cols-3 gap-2">
              {figures(event).map((figure) => (
                <div key={figure.label}>
                  <dt className="text-ink-ghost text-[10px] font-semibold tracking-[0.11em] uppercase">
                    {figure.label}
                  </dt>
                  <dd
                    className={cn(
                      'mt-0.5 font-mono text-[14px]',
                      figure.value ? figure.className : 'text-ink-ghost',
                    )}
                  >
                    {figure.value ?? (
                      <>
                        <span aria-hidden>—</span>
                        <span className="sr-only">{notReleased}</span>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div className="relative hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[860px] border-collapse text-[15px]">
          <caption className="sr-only">{caption}</caption>

          <colgroup>
            <col className="w-21" />
            <col className="w-15" />
            <col />
            <col className="w-20" />
            <col className="w-24" />
            <col className="w-24" />
            <col className="w-24" />
          </colgroup>

          <thead
            className={cn(
              // `text-ink-ghost` (#a8a49b) is deliberately the eyebrow
              // colour used across the site, but on a table full of live
              // data it disappears into the background — the reader scans
              // right past it. Bumping to `text-ink-muted` (#5a6068) makes
              // the row read as a real header. Bottom border separates it
              // from the first data row so the eye lands on the columns.
              'text-ink-muted border-line-strong border-b text-[11px] font-semibold tracking-[0.11em] uppercase',
              !showColumnHeaders && 'sr-only',
            )}
          >
            <tr>
              <th scope="col" className="pb-2.5 text-left">
                {timeLabel}
              </th>
              <th scope="col" className="pb-2.5 text-left">
                {t('columns.region')}
              </th>
              <th scope="col" className="pb-2.5 text-left">
                {t('columns.event')}
              </th>
              <th scope="col" className="pb-2.5 text-left">
                {t('columns.impact')}
              </th>
              <th scope="col" className="pb-2.5 text-right">
                {t('columns.actual')}
              </th>
              <th scope="col" className="pb-2.5 text-right">
                {t('columns.expected')}
              </th>
              <th scope="col" className="pb-2.5 text-right">
                {t('columns.previous')}
              </th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => (
              <tr
                key={event.id}
                className={cn(
                  'border-line border-t last:border-b',
                  variant === 'upcoming' && index === 0 && 'border-t-ink',
                  event.isNextUp
                    ? 'bg-surface-tint'
                    : variant === 'selected'
                      ? 'bg-surface'
                      : 'bg-transparent',
                )}
              >
                <td className="py-3.5">
                  <time
                    className={cn(
                      'font-mono',
                      event.isNextUp ? 'text-accent' : 'text-ink-subtle',
                    )}
                  >
                    {event.time}
                  </time>
                </td>
                <td className="text-accent py-3.5 font-mono text-[11px] tracking-[0.06em]">
                  {event.region}
                </td>
                <td
                  className={cn('py-3.5 pr-6', event.isNextUp && 'font-medium')}
                >
                  <Link
                    href={`/calendar/${event.slug}`}
                    className="text-ink hover:text-accent"
                  >
                    {event.title}
                  </Link>
                  {event.isNextUp ? (
                    <span className="text-accent"> · {t('nextUp.label')}</span>
                  ) : null}
                </td>
                <td className="py-3.5">
                  <ImpactBars impact={event.impact} />
                </td>
                <ValueCell
                  value={event.actual}
                  className={SURPRISE_COLOR[event.surprise]}
                  notReleasedLabel={notReleased}
                />
                <ValueCell
                  value={event.expected}
                  className="text-ink-secondary"
                  notReleasedLabel={notReleased}
                />
                <ValueCell
                  value={event.previous}
                  className="text-ink-ghost"
                  notReleasedLabel={notReleased}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
