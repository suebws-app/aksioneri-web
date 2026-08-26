/**
 * Types for the calculation engine.
 *
 * These live inside `engine/` rather than beside the feature's other types
 * because the engine imports nothing from outside itself — see the
 * `no-restricted-imports` block in `eslint.config.mjs`. The feature layer
 * re-exports them, so callers do not need to know that.
 */

/**
 * Why a calculation declined to produce a number.
 *
 * The spec's hardest requirement is "never silently produce misleading
 * results". The way this engine satisfies it is by refusing: no function
 * returns `NaN`, `Infinity`, or a number extrapolated past the data it was
 * given. Each reason maps to a translated sentence in the UI, so a reader is
 * told what went wrong rather than shown a broken figure.
 */
export type RefusalReason =
  /** An input was NaN or Infinity — usually an unparseable field. */
  | 'nonFinite'
  /** A principal, contribution or price was negative where it cannot be. */
  | 'negativeAmount'
  /** A rate at or below −100%, which destroys more than exists. */
  | 'rateOutOfRange'
  /** A term of zero or beyond the horizon the model is honest over. */
  | 'termOutOfRange'
  /** A denominator was zero — a return from a zero starting value, say. */
  | 'divideByZero'
  /** The result left the range where doubles carry cent precision. */
  | 'overflow'
  /** Market or index data needed for this calculation is missing. */
  | 'noData';

/** The result of any engine function: a value, or a stated refusal. */
export type Outcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: RefusalReason };

export const ok = <T>(value: T): Outcome<T> => ({ ok: true, value });
export const refuse = <T>(reason: RefusalReason): Outcome<T> => ({
  ok: false,
  reason,
});

/** Currencies a calculation can be denominated in. */
export type Currency = 'EUR' | 'USD';

/** One observation in a time series — an FX rate, a CPI level, a close. */
export interface SeriesPoint {
  /** ISO calendar date, UTC. */
  readonly date: string;
  readonly value: number;
}

/**
 * Everything ambient a calculation may need, passed in rather than read.
 *
 * `today` is injected so that a result is a pure function of its inputs: the
 * server and the browser must compute the same number from the same URL, and
 * a `Date.now()` inside the engine would make that untrue twice a day at
 * midnight and untestable always.
 */
export interface ComputeContext {
  /** ISO calendar date, UTC. */
  readonly today: string;
  readonly currency: Currency;
  /** Present only for calculators that declare a market-data need. */
  readonly series?: Readonly<Record<string, readonly SeriesPoint[]>>;
  readonly rates?: Readonly<Record<string, number>>;
  /**
   * The day the supplied data was published.
   *
   * Carried alongside the numbers rather than fetched separately, because a
   * reference rate without its date is not a fact: the ECB fixes once per
   * business day, and a reader looking at a converter on Sunday is looking at
   * Friday's number whether or not the page admits it. The UI prints this.
   */
  readonly dataDate?: string;
  /** Attribution for the same, e.g. `ecb`. */
  readonly dataSource?: string;
}
