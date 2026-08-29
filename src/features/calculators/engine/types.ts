export type RefusalReason =
  | 'nonFinite'
  | 'negativeAmount'
  | 'rateOutOfRange'
  | 'termOutOfRange'
  | 'divideByZero'
  | 'overflow'
  | 'noData';

export type Outcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: RefusalReason };

export const ok = <T>(value: T): Outcome<T> => ({ ok: true, value });
export const refuse = <T>(reason: RefusalReason): Outcome<T> => ({
  ok: false,
  reason,
});

export type Currency = 'EUR' | 'USD';

export interface SeriesPoint {
  readonly date: string;
  readonly value: number;
}

export interface ComputeContext {
  readonly today: string;
  readonly currency: Currency;
  readonly series?: Readonly<Record<string, readonly SeriesPoint[]>>;
  readonly rates?: Readonly<Record<string, number>>;
  readonly dataDate?: string;
  readonly dataSource?: string;
}
