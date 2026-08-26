import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { DayTabs } from './components/DayTabs';
import { EventTable } from './components/EventTable';
import { ImpactLegend } from './components/ImpactLegend';
import { NextUpCard } from './components/NextUpCard';
import { ReadingPrimer } from './components/ReadingPrimer';
import { RegionFilter } from './components/RegionFilter';
import { formatLongDate } from './formatDate';
import {
  matchesRegionFilter,
  type CalendarWeek,
  type RegionFilterValue,
} from './calendarTypes';

export interface CalendarPageProps {
  week: CalendarWeek;
  region: RegionFilterValue;
  /**
   * Both flags mirror the design's `sc-if` props. They default to true, so the
   * page renders complete unless a caller deliberately hides a block.
   */
  showNextUp?: boolean;
  showPrimer?: boolean;
}

export function CalendarPage({
  week,
  region,
  showNextUp = true,
  showPrimer = true,
}: CalendarPageProps) {
  const t = useTranslations('calendar');
  const locale = useLocale() as Locale;

  const selectedDay = week.days.find((day) => day.date === week.selectedDate);
  const selectedEvents = (selectedDay?.events ?? []).filter((event) =>
    matchesRegionFilter(event.region, region),
  );

  const longDate = (date: string) => formatLongDate(locale, date);

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="calendar"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main className="flex-1">
        <div className="page-container pt-10">
          <div className="mb-6.5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-ink mb-2 font-serif text-[38px] font-medium tracking-[-0.02em]">
                {t('heading')}
              </h1>
              <p className="text-ink-muted text-base">{t('subheading')}</p>
            </div>
            <ImpactLegend />
          </div>

          {showNextUp && week.nextUp ? (
            <NextUpCard event={week.nextUp} />
          ) : null}

          <div className="border-line flex flex-col gap-3 border-b lg:flex-row lg:items-end lg:justify-between">
            <DayTabs
              days={week.days}
              selectedDate={week.selectedDate}
              todayDate={week.todayDate}
            />
            <RegionFilter selected={region} selectedDate={week.selectedDate} />
          </div>
        </div>

        {/* Only the currently-selected day's events render below. Later
            days used to be shown inline as extra sections; the tabs are
            now the sole way to switch dates, which reads cleaner and
            keeps the page short on a busy week. */}
        <div className="page-container pt-5">
          {selectedEvents.length > 0 ? (
            <EventTable
              events={selectedEvents}
              caption={t('tableCaption', { date: longDate(week.selectedDate) })}
              showColumnHeaders
            />
          ) : (
            <p className="border-line text-ink-faint border-t py-10 text-center text-[15px]">
              {t('empty')}
            </p>
          )}
        </div>

        {showPrimer ? (
          <div className="page-container py-11">
            <ReadingPrimer />
          </div>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
