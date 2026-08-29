'use client';

import { useMemo, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { SQ_MONTH_LONG, SQ_WEEKDAY_SHORT } from '@/lib/format/albanianDates';
import { cn } from '@/lib/utils/cn';

export interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  'aria-describedby'?: string | undefined;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

const EARLIEST_YEAR = 1970;

const YEARS_AHEAD = 15;

const YEAR_GRID = 12;

type View = 'day' | 'month' | 'year';

const parse = (value: string): Date | undefined => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const toIso = (date: Date): string =>
  `${String(date.getFullYear()).padStart(4, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const formatTrigger = (date: Date): string =>
  `${String(date.getUTCDate())} ${SQ_MONTH_LONG[date.getUTCMonth()] ?? ''} ${String(
    date.getUTCFullYear(),
  )}`;

const daysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

export const clampDayToMonth = (
  year: number,
  month: number,
  day: number,
): number => Math.min(day, daysInMonth(year, month));

const blockStart = (year: number): number => Math.floor(year / 10) * 10;

export function DatePicker({
  id,
  value,
  onChange,
  placeholder,
  invalid = false,
  disabled = false,
  className,
  ...aria
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('day');

  const selected = parse(value);

  const latestYear = useMemo(() => new Date().getFullYear() + YEARS_AHEAD, []);

  const [cursor, setCursor] = useState(() => {
    const from = selected ?? new Date();
    return { year: from.getUTCFullYear(), month: from.getUTCMonth() };
  });

  const commit = (year: number, month: number, day: number) => {
    onChange(toIso(new Date(year, month, clampDayToMonth(year, month, day))));
  };

  const headerButton =
    'text-ink hover:text-accent focus-visible:outline-accent rounded-sm px-1.5 py-0.5 font-medium capitalize outline-none focus-visible:outline-2 focus-visible:outline-offset-1';

  const navButton =
    'text-ink-muted hover:text-accent focus-visible:outline-accent inline-flex h-8 w-8 items-center justify-center rounded-sm outline-none focus-visible:outline-2';

  const gridCell =
    'text-ink-body hover:bg-surface-tint focus-visible:outline-accent inline-flex h-9 items-center justify-center rounded-sm font-sans text-[13px] outline-none focus-visible:outline-2';

  const chevron = (direction: 'left' | 'right') => (
    <svg aria-hidden viewBox="0 0 8 12" width="8" height="12" fill="none">
      <path
        d={direction === 'left' ? 'M6.5 1 1.5 6l5 5' : 'M1.5 1l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const yearBlock = blockStart(cursor.year);
  const years = Array.from({ length: YEAR_GRID }, (_, i) => yearBlock - 1 + i);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (next) {
          const from = parse(value) ?? new Date();
          setView('day');
          setCursor({
            year: from.getUTCFullYear(),
            month: from.getUTCMonth(),
          });
        }
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-describedby={aria['aria-describedby']}
          className={cn(
            'border-line-strong bg-surface text-ink focus-visible:outline-accent flex min-h-11 w-full items-center justify-between gap-3 rounded-sm border px-3.5 py-2.5 text-left font-mono text-[15px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-55',
            invalid ? 'border-negative' : '',
            className,
          )}
        >
          <span className={selected ? '' : 'text-ink-ghost'}>
            {selected ? formatTrigger(selected) : placeholder}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            width="15"
            height="15"
            className="text-ink-faint shrink-0"
          >
            <rect
              x="1.5"
              y="3"
              width="13"
              height="11.5"
              rx="1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M1.5 6.5h13M5 1.5v3M11 1.5v3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="border-line-strong bg-surface z-50 w-[282px] rounded-sm border p-3 shadow-[0_4px_20px_rgba(21,24,28,0.13)]"
        >
          {view === 'day' ? (
            <DayPicker
              mode="single"
              selected={selected}
              month={new Date(cursor.year, cursor.month)}
              onMonthChange={(month) => {
                setCursor({
                  year: month.getFullYear(),
                  month: month.getMonth(),
                });
              }}
              onSelect={(date) => {
                if (!date) return;
                onChange(toIso(date));
                setOpen(false);
              }}
              startMonth={new Date(EARLIEST_YEAR, 0)}
              endMonth={new Date(latestYear, 11)}
              weekStartsOn={1}
              showOutsideDays
              formatters={{
                formatWeekdayName: (day) =>
                  SQ_WEEKDAY_SHORT[day.getDay()] ?? '',
              }}
              components={{
                MonthCaption: () => (
                  <div className="relative flex h-9 items-center">
                    <button
                      type="button"
                      className={headerButton}
                      onClick={() => {
                        setView('month');
                      }}
                    >
                      {SQ_MONTH_LONG[cursor.month]} {cursor.year}
                    </button>
                  </div>
                ),
              }}
              classNames={{
                root: 'relative font-sans text-[13.5px]',
                months: 'flex flex-col',
                month: 'flex flex-col gap-2',
                nav: 'absolute top-0.5 right-0 flex items-center gap-0.5',
                button_previous: navButton,
                button_next: navButton,
                chevron: 'fill-current',
                month_grid: 'w-full border-collapse',
                weekdays: 'flex',
                weekday:
                  'text-ink-faint w-9 text-[11px] font-normal tracking-[0.04em] uppercase',
                week: 'flex w-full',
                day: 'p-0',
                day_button:
                  'text-ink-body hover:bg-surface-tint focus-visible:outline-accent inline-flex h-9 w-9 items-center justify-center rounded-sm font-mono tabular-nums outline-none focus-visible:outline-2',
                selected:
                  '[&_button]:bg-accent [&_button]:hover:bg-[#0f2c4a] [&_button]:text-white [&_button]:font-medium',
                today:
                  '[&_button]:ring-line-strong [&_button]:font-medium [&_button]:ring-1 [&_button]:ring-inset',
                outside: '[&_button]:text-ink-ghost',
                disabled: '[&_button]:opacity-40',
              }}
            />
          ) : null}

          {view === 'month' ? (
            <div className="font-sans text-[13.5px]">
              <div className="relative flex h-9 items-center">
                <button
                  type="button"
                  className={headerButton}
                  onClick={() => {
                    setView('year');
                  }}
                >
                  {cursor.year}
                </button>

                <div className="absolute top-0.5 right-0 flex items-center gap-0.5">
                  <button
                    type="button"
                    className={navButton}
                    disabled={cursor.year <= EARLIEST_YEAR}
                    onClick={() => {
                      setCursor((c) => ({ ...c, year: c.year - 1 }));
                    }}
                  >
                    {chevron('left')}
                  </button>
                  <button
                    type="button"
                    className={navButton}
                    disabled={cursor.year >= latestYear}
                    onClick={() => {
                      setCursor((c) => ({ ...c, year: c.year + 1 }));
                    }}
                  >
                    {chevron('right')}
                  </button>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-1">
                {SQ_MONTH_LONG.map((name, index) => {
                  const isSelected =
                    selected !== undefined &&
                    selected.getUTCFullYear() === cursor.year &&
                    selected.getUTCMonth() === index;

                  return (
                    <button
                      key={name}
                      type="button"
                      aria-current={isSelected ? 'true' : undefined}
                      className={cn(
                        gridCell,
                        'capitalize',
                        isSelected
                          ? 'bg-accent font-medium text-white hover:bg-[#0f2c4a]'
                          : '',
                      )}
                      onClick={() => {
                        setCursor((c) => ({ ...c, month: index }));
                        if (selected) {
                          commit(cursor.year, index, selected.getUTCDate());
                        }
                        setView('day');
                      }}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {view === 'year' ? (
            <div className="font-sans text-[13.5px]">
              <div className="relative flex h-9 items-center">
                <span className="text-ink px-1.5 font-medium">
                  {yearBlock}–{yearBlock + 9}
                </span>

                <div className="absolute top-0.5 right-0 flex items-center gap-0.5">
                  <button
                    type="button"
                    className={navButton}
                    disabled={yearBlock <= EARLIEST_YEAR}
                    onClick={() => {
                      setCursor((c) => ({ ...c, year: c.year - 10 }));
                    }}
                  >
                    {chevron('left')}
                  </button>
                  <button
                    type="button"
                    className={navButton}
                    disabled={yearBlock + 10 > latestYear}
                    onClick={() => {
                      setCursor((c) => ({ ...c, year: c.year + 10 }));
                    }}
                  >
                    {chevron('right')}
                  </button>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-1">
                {years.map((year) => {
                  const outOfRange = year < EARLIEST_YEAR || year > latestYear;
                  const isSelected = selected?.getUTCFullYear() === year;
                  const isOutsideBlock =
                    year < yearBlock || year > yearBlock + 9;

                  return (
                    <button
                      key={year}
                      type="button"
                      disabled={outOfRange}
                      aria-current={isSelected ? 'true' : undefined}
                      className={cn(
                        gridCell,
                        'font-mono tabular-nums',
                        isOutsideBlock ? 'text-ink-ghost' : '',
                        outOfRange ? 'opacity-40' : '',
                        isSelected
                          ? 'bg-accent font-medium text-white hover:bg-[#0f2c4a]'
                          : '',
                      )}
                      onClick={() => {
                        setCursor((c) => ({ ...c, year }));
                        setView('month');
                      }}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
