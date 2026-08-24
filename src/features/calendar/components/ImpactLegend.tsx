import { useTranslations } from 'next-intl';
import type { EventImpact } from '../calendarTypes';
import { ImpactBars } from './ImpactBars';

const LEVELS: EventImpact[] = ['high', 'medium', 'low'];

/** Explains the bar notation once, beside the page title. */
export function ImpactLegend() {
  const t = useTranslations('calendar.impact');

  return (
    <ul className="text-ink-faint flex items-center gap-4.5 text-[13px]">
      {LEVELS.map((level) => (
        <li key={level} className="flex items-center gap-[7px]">
          <ImpactBars impact={level} />
          {t(`${level}Legend`)}
        </li>
      ))}
    </ul>
  );
}
