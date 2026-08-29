export const MAX_YEARS = 100;

export const MAX_MONEY = 9_000_000_000_000;

export const isFiniteNumber = (value: number): boolean =>
  typeof value === 'number' && Number.isFinite(value);

export const allFinite = (...values: number[]): boolean =>
  values.every(isFiniteNumber);

export const isRepresentableMoney = (value: number): boolean =>
  isFiniteNumber(value) && Math.abs(value) <= MAX_MONEY;

export const isValidRatePercent = (percent: number): boolean =>
  isFiniteNumber(percent) && percent > -100 && percent <= 1_000;

export const isValidYears = (years: number): boolean =>
  isFiniteNumber(years) && years > 0 && years <= MAX_YEARS;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const asFraction = (percent: number): number => percent / 100;

export const toCents = (value: number): number => Math.round(value * 100);

export const fromCents = (cents: number): number => cents / 100;

export const roundMoney = (value: number): number =>
  Math.round(value * 100) / 100;

export const monthlyGrowthFactor = (
  annualRatePercent: number,
  periodsPerYear: number,
): number => {
  const nominal = asFraction(annualRatePercent);
  const effectiveAnnual = (1 + nominal / periodsPerYear) ** periodsPerYear - 1;
  return (1 + effectiveAnnual) ** (1 / 12);
};

export const deflate = (
  nominal: number,
  inflationPercent: number,
  years: number,
): number => nominal / (1 + asFraction(inflationPercent)) ** years;
