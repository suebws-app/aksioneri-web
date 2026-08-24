import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { CalendarEvent, SurpriseDirection } from '../calendarTypes';
import { ImpactBars } from './ImpactBars';

/**
 * A real `<table>` rather than the design's grid of divs: this is tabular data,
 * and a screen reader should announce "Expected, 3.1%" rather than a bare
 * number. The visual result is identical.
 *
 * One deliberate deviation — the design makes the highlighted next-up row a
 * single full-row anchor, which is not valid inside a table row. Every row
 * links from its event title instead, which also leaves the figures selectable.
 *
 * Below the table's natural width it scrolls sideways inside its own container
 * rather than collapsing to cards: a release is read by comparing actual
 * against expected, and that comparison needs the columns side by side.
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
  /** Column headers are drawn once, on the first table of the page. */
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
  showColumnHeaders = false,
  variant = 'selected',
}: EventTableProps) {
  const t = useTranslations('calendar');

  if (events.length === 0) return null;

  const notReleased = t('notReleased');

  // `relative` on the scroll container is load-bearing: `sr-only` positions
  // absolutely, and with no positioned ancestor those boxes resolve against the
  // page and widen the document, giving the whole page a horizontal scrollbar.
  return (
    <div className="relative overflow-x-auto">
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
            'text-ink-ghost text-[11px] font-semibold tracking-[0.11em] uppercase',
            // The header row is present for assistive technology on every
            // table, but drawn only on the first one.
            !showColumnHeaders && 'sr-only',
          )}
        >
          <tr>
            <th scope="col" className="pb-3 text-left">
              {t('columns.time')}
            </th>
            <th scope="col" className="pb-3 text-left">
              {t('columns.region')}
            </th>
            <th scope="col" className="pb-3 text-left">
              {t('columns.event')}
            </th>
            <th scope="col" className="pb-3 text-left">
              {t('columns.impact')}
            </th>
            <th scope="col" className="pb-3 text-right">
              {t('columns.actual')}
            </th>
            <th scope="col" className="pb-3 text-right">
              {t('columns.expected')}
            </th>
            <th scope="col" className="pb-3 text-right">
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
  );
}
