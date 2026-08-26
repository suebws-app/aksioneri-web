import { allFinite, isRepresentableMoney, roundMoney } from './guards';
import { ok, refuse, type ComputeContext, type Outcome } from './types';

export interface FxInput {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
}

export interface FxResult {
  readonly converted: number;
  readonly rate: number;
  /** The reverse rate, which readers check against. */
  readonly inverseRate: number;
  /** What one unit of `from` buys, for the "1 EUR = 1.17 USD" line. */
  readonly unitRate: number;
}

/**
 * Convert between two currencies using rates supplied in the context.
 *
 * The engine performs no I/O — the rates arrive in `ctx.rates` as units per
 * one euro, exactly as the ECB publishes them, and the cross is computed
 * here. That keeps this function testable with a fixed table and keeps the
 * fetching where it belongs.
 *
 * **A missing rate is a refusal, never a guess.** There is no fallback to a
 * stale figure and no interpolation: if we cannot price the pair, the page
 * says so and offers manual entry.
 */
export function computeFx(
  input: FxInput,
  ctx: ComputeContext,
): Outcome<FxResult> {
  const { amount, from, to } = input;

  if (!allFinite(amount)) return refuse('nonFinite');
  if (!isRepresentableMoney(amount)) return refuse('overflow');

  const rates = ctx.rates;
  if (!rates) return refuse('noData');

  // A currency is exactly one of itself. Handled before the lookup so the
  // identity case works even when the table is missing that currency.
  if (from === to) {
    return ok({
      converted: roundMoney(amount),
      rate: 1,
      inverseRate: 1,
      unitRate: 1,
    });
  }

  const fromRate = from === 'EUR' ? 1 : rates[from];
  const toRate = to === 'EUR' ? 1 : rates[to];

  if (fromRate === undefined || toRate === undefined) return refuse('noData');
  if (!allFinite(fromRate, toRate)) return refuse('nonFinite');
  if (fromRate === 0) return refuse('divideByZero');

  const rate = toRate / fromRate;
  const converted = amount * rate;

  if (!isRepresentableMoney(converted)) return refuse('overflow');

  return ok({
    // Currency amounts keep two decimals; the rate keeps six, because a
    // pair like EUR/HUF is meaningless rounded to two.
    converted: roundMoney(converted),
    rate: Math.round(rate * 1e6) / 1e6,
    inverseRate: rate === 0 ? 0 : Math.round((1 / rate) * 1e6) / 1e6,
    unitRate: Math.round(rate * 1e6) / 1e6,
  });
}
