'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { SQ_MONTH_LONG, SQ_WEEKDAY_SHORT } from '@/lib/format/albanianDates';
import { cn } from '@/lib/utils/cn';

/**
 * A date field: a button showing the chosen day, opening a calendar.
 *
 * Built on the shadcn pattern — Radix Popover wrapping `react-day-picker` —
 * but wired to this repo's own tokens, `cn` and focus conventions rather than
 * shadcn's generated `components/ui` layer. The site had no shadcn install and
 * no Radix at all; adding the generated components alongside the hand-rolled
 * ones would have left two component systems that drift apart. This is the
 * pattern, in the house style.
 *
 * Replaces `<input type="date">`, whose native picker is unstyleable, differs
 * on every platform, and shows month names in the browser's locale rather than
 * the site's — a reader on an English-locale phone got an Albanian page with
 * an English calendar.
 *
 * **Three levels, not a pair of dropdowns.** The header is a button: day view
 * → month view → year view, and back down again as a choice is made. Select
 * dropdowns were tried first and were worse — the native control renders its
 * own popup outside the calendar, collided with the nav arrows, and put a
 * seventy-item scroll list in front of anyone looking for a year.
 *
 * **Never calls `Intl`.** Month and weekday names come from the hardcoded
 * tables in `lib/format/albanianDates`, for the reason `formatDate.ts`
 * documents: Node's full ICU and Chromium's subset disagree about `sq`, and
 * this component renders on both sides of hydration.
 *
 * Values cross the boundary as `YYYY-MM-DD` strings, which is what the
 * calculators' URL codec reads and writes — a `Date` would drag a timezone
 * into a field that means a calendar day.
 */

export interface DatePickerProps {
  id?: string;
  /** ISO calendar date, `YYYY-MM-DD`. Empty string when unset. */
  value: string;
  onChange: (value: string) => void;
  /** Announced on the trigger when no date is chosen. */
  placeholder: string;
  'aria-describedby'?: string | undefined;
  /**
   * Draws the error border.
   *
   * Deliberately **not** `aria-invalid`: the trigger is a button, and
   * `aria-invalid` is not supported on that role. The error itself reaches a
   * screen reader through `aria-describedby`, which points at the `role=alert`
   * message `Field` renders — so the state is announced, just not twice and
   * not through an attribute the role ignores.
   */
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * How far back the year grid reaches.
 *
 * 1970 rather than something tighter: a reader working out a long-held
 * position, or an inflation comparison against the year they were born, needs
 * to get there without paging through a century.
 */
const EARLIEST_YEAR = 1970;

/**
 * And how far forward. Sale dates are usually today, but a retirement or
 * maturity date is not — so the range runs past the present.
 */
const YEARS_AHEAD = 15;

/** Years shown at once: a decade, plus the year either side of it. */
const YEAR_GRID = 12;

type View = 'day' | 'month' | 'year';

/** Parsed at UTC midnight, so a reader west of Greenwich never sees yesterday. */
const parse = (value: string): Date | undefined => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

/** Back to ISO, reading the local fields `react-day-picker` sets. */
const toIso = (date: Date): string =>
  `${String(date.getFullYear()).padStart(4, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** `26 gusht 2026` — the long form, since the trigger has room for it. */
const formatTrigger = (date: Date): string =>
  `${String(date.getUTCDate())} ${SQ_MONTH_LONG[date.getUTCMonth()] ?? ''} ${String(
    date.getUTCFullYear(),
  )}`;

const daysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/**
 * The same day-of-month in a different month, or that month's last day.
 *
 * Exported so it can be tested directly: the 31st moving into February is the
 * case that matters, and `new Date(2023, 1, 31)` silently rolls forward to
 * 3 March rather than refusing — which would move a reader's purchase date
 * into a month they did not pick.
 */
export const clampDayToMonth = (
  year: number,
  month: number,
  day: number,
): number => Math.min(day, daysInMonth(year, month));

/** First year of the block the given year falls in: 2026 → 2020. */
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

  // Read once per render rather than at module load, so a long-lived tab does
  // not cap the range at the year it was opened.
  const latestYear = new Date().getFullYear() + YEARS_AHEAD;

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

        // Opening always starts on the days of the selected month. Leaving it
        // where the reader last browsed means reopening the field can show a
        // year grid with no obvious relationship to the value in the trigger.
        //
        // Done here rather than in an effect: this is a response to an event,
        // not a synchronisation with an external system, and setting state
        // from an effect would trigger a second render for no reason.
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
              // Monday first: the week starts on Monday in Kosovo, and a
              // Sunday-first grid makes every reader count twice.
              weekStartsOn={1}
              showOutsideDays
              formatters={{
                formatWeekdayName: (day) =>
                  SQ_WEEKDAY_SHORT[day.getDay()] ?? '',
              }}
              components={{
                // The caption becomes the way up a level. A plain label would
                // leave the month and year reachable only by clicking the
                // arrow twelve times.
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
                // The hover background has to be restated for the selected
                // day. Without it the button's own `hover:bg-surface-tint`
                // applies on hover — a pale fill under white text, so the
                // number vanished exactly on the date the reader had chosen.
                selected:
                  '[&_button]:bg-accent [&_button]:hover:bg-[#0f2c4a] [&_button]:text-white [&_button]:font-medium',
                // Today is marked with a ring rather than a colour. A colour
                // would collide with the selected state on the day that is
                // both — same specificity, so which one won came down to
                // stylesheet order.
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
                        // Carry the chosen day across, clamped. Picking a
                        // month for an already-dated field should move the
                        // date, not just the view.
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
                  // The first and last cells belong to the neighbouring
                  // decades; dimmed, so the block reads as 2020–2029 while
                  // still letting a reader step one year over the edge.
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
