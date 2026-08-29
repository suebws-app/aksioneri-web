import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { CalendarEvent } from '@/features/calendar';

interface ComingUpProps {
  events: CalendarEvent[];
}

export function ComingUp({ events }: ComingUpProps) {
  const t = useTranslations('markets.comingUp');

  return (
    <aside className="border-line bg-paper rounded-sm border p-6">
      <h2 className="text-ink font-serif text-xl">{t('heading')}</h2>
      <p className="text-ink-faint mt-1 mb-5 text-[13px]">{t('window')}</p>

      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className="border-line-soft border-b last:border-b-0"
          >
            <Link
              href={`/calendar/${event.slug}`}
              className="hover:bg-surface block py-4.5 first:pt-0"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="text-accent rounded-[2px] border border-[#c7d3e2] px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em]">
                    {event.region}
                  </span>
                  <span className="text-ink text-[15px] font-medium">
                    {event.title}
                  </span>
                </span>
                <time className="text-ink-muted font-mono text-[13px]">
                  {event.time}
                </time>
              </div>

              <div className="text-ink-faint flex gap-4.5 text-[13px]">
                {event.expected ? (
                  <span>
                    {t('expected')}{' '}
                    <span className="text-ink-secondary font-mono">
                      {event.expected}
                    </span>
                  </span>
                ) : null}
                {event.previous ? (
                  <span>
                    {t('previous')}{' '}
                    <span className="text-ink-secondary font-mono">
                      {event.previous}
                    </span>
                  </span>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-4.5">
        <p className="text-ink-muted mb-3 text-sm leading-relaxed">
          {t('note')}
        </p>
        <Link
          href="/calendar"
          className="text-accent text-[13px] hover:underline"
        >
          {t('viewCalendar')}
        </Link>
      </div>
    </aside>
  );
}
