import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { NextUpEvent } from '../calendarTypes';
import { ImpactBars } from './ImpactBars';

interface NextUpCardProps {
  event: NextUpEvent;
}

function Figure({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-ink-faint mb-1.5 text-xs tracking-[0.06em] uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

export function NextUpCard({ event }: NextUpCardProps) {
  const t = useTranslations('calendar.nextUp');

  const hours = Math.floor(event.minutesAway / 60);
  const minutes = event.minutesAway % 60;

  return (
    <article className="border-line bg-surface mb-8 flex flex-col rounded-sm border lg:flex-row">
      <div className="flex-1 p-7 sm:px-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-accent text-[11px] font-semibold tracking-[0.12em] uppercase">
            {t('label')}
          </span>
          <span aria-hidden className="size-[3px] rounded-full bg-[#c8c3b8]" />
          <span className="text-ink-faint text-[13px]">
            {t('countdown', { hours, minutes })}
          </span>
        </div>

        <h2 className="text-ink mb-2.5 font-serif text-[30px] leading-[1.18] font-medium tracking-[-0.015em]">
          <Link href={`/calendar/${event.slug}`} className="hover:text-accent">
            {event.title}
          </Link>
        </h2>

        <p className="text-ink-body mb-4.5 max-w-[60ch] text-base leading-relaxed">
          {event.summary}
        </p>

        <div className="border-line-soft flex flex-wrap gap-x-8.5 gap-y-4 border-t pt-4.5">
          <Figure label={t('time')}>
            <time className="text-ink font-mono text-lg">{event.time}</time>
          </Figure>
          <Figure label={t('expected')}>
            <span className="text-ink font-mono text-lg">{event.expected}</span>
          </Figure>
          <Figure label={t('previous')}>
            <span className="text-ink font-mono text-lg">{event.previous}</span>
          </Figure>
          <Figure label={t('impact')}>
            <ImpactBars impact={event.impact} size="md" className="pt-[5px]" />
          </Figure>
        </div>
      </div>

      <aside className="border-line bg-surface-tint p-7 sm:px-8 lg:w-[380px] lg:shrink-0 lg:border-l">
        <h3 className="text-accent mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
          {t('whyItMatters')}
        </h3>
        {event.whyItMatters.map((paragraph, index) => (
          <p
            key={index}
            className="text-ink-secondary mb-3.5 text-[15.5px] leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
        <Link
          href={`/calendar/${event.slug}`}
          className="text-accent text-[13px] hover:underline"
        >
          {t('openExplainer')}
        </Link>
      </aside>
    </article>
  );
}
