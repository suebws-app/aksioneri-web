import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { clientEnv } from '@/lib/utils/env.client';
import { cn } from '@/lib/utils/cn';
import type { CalendarEvent, SurpriseDirection } from '../calendarTypes';
import { ImpactBars } from './ImpactBars';

const DISPLAY_TZ = clientEnv.NEXT_PUBLIC_DISPLAY_TZ;

function currentZoneAbbreviation(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: DISPLAY_TZ,
    timeZoneName: 'short',
  }).formatToParts(new Date());
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'CET';
}

const SURPRISE_COLOR: Record<SurpriseDirection, string> = {
  below: 'text-positive',
  above: 'text-negative',
  inline: 'text-ink-secondary',
};

interface EventTableProps {
  events: CalendarEvent[];
  caption: string;
  showColumnHeaders?: boolean;
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
  const timeLabel = `${t('columns.time')} (${currentZoneAbbreviation()})`;

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
