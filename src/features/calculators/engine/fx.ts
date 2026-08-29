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
  readonly inverseRate: number;
  readonly unitRate: number;
}

export function computeFx(
  input: FxInput,
  ctx: ComputeContext,
): Outcome<FxResult> {
  const { amount, from, to } = input;

  if (!allFinite(amount)) return refuse('nonFinite');
  if (!isRepresentableMoney(amount)) return refuse('overflow');

  const rates = ctx.rates;
  if (!rates) return refuse('noData');

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
    converted: roundMoney(converted),
    rate: Math.round(rate * 1e6) / 1e6,
    inverseRate: rate === 0 ? 0 : Math.round((1 / rate) * 1e6) / 1e6,
    unitRate: Math.round(rate * 1e6) / 1e6,
  });
}
