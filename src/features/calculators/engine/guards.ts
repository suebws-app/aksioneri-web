/**
 * Input guards and money arithmetic shared by every calculation.
 *
 * Two jobs. First, turn "this input is impossible" into a stated refusal
 * before any arithmetic runs, so a bad field never reaches a formula and
 * comes back as `NaN`. Second, hold the money rules in one place, because
 * getting them subtly different per calculator is how two pages disagree
 * about the same figure.
 */

/**
 * The longest horizon the models are honest over.
 *
 * Not a technical limit — the arithmetic is fine at 500 years. It is an
 * editorial one: a projection past a human lifetime is not a projection, and
 * a calculator that cheerfully compounds for three centuries invites a
 * screenshot that makes the publication look silly.
 */
export const MAX_YEARS = 100;

/**
 * Above this, doubles can no longer represent every cent.
 *
 * `Number.MAX_SAFE_INTEGER` is ~9.0e15, and money is held in cents, so the
 * last figure with exact cent precision is ~9.0e13. Past it, sums stop being
 * reliable — so the engine refuses rather than returning a number that looks
 * precise and is not.
 */
export const MAX_MONEY = 9_000_000_000_000;

export const isFiniteNumber = (value: number): boolean =>
  typeof value === 'number' && Number.isFinite(value);

export const allFinite = (...values: number[]): boolean =>
  values.every(isFiniteNumber);

/** Within the range where a money figure is still exact and meaningful. */
export const isRepresentableMoney = (value: number): boolean =>
  isFiniteNumber(value) && Math.abs(value) <= MAX_MONEY;

/**
 * A rate, as a percentage, that the models can carry.
 *
 * At or below −100% a period wipes out more than the balance holds and every
 * subsequent step is meaningless, so it is refused rather than modelled. The
 * upper bound is generous — hyperinflation is a real thing a reader may want
 * to model — but finite.
 */
export const isValidRatePercent = (percent: number): boolean =>
  isFiniteNumber(percent) && percent > -100 && percent <= 1_000;

export const isValidYears = (years: number): boolean =>
  isFiniteNumber(years) && years > 0 && years <= MAX_YEARS;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** A percentage as a fraction: `7` → `0.07`. */
export const asFraction = (percent: number): number => percent / 100;

/**
 * Money as integer minor units.
 *
 * Every schedule that must sum to a stated total — an amortisation table, a
 * dividend ledger — runs in cents, because 0.1 + 0.2 is famously not 0.3 and
 * a reader who adds up a column expects it to match the total printed above
 * it. `Math.round` rather than truncation: a half-cent belongs to whichever
 * side is nearer, and truncating biases every row the same way.
 */
export const toCents = (value: number): number => Math.round(value * 100);

export const fromCents = (cents: number): number => cents / 100;

/**
 * Round to whole cents at a boundary.
 *
 * Use on values leaving the engine, never inside a loop whose output feeds
 * the next iteration — rounding a running balance every month over a
 * forty-year projection compounds the rounding, not just the interest.
 */
export const roundMoney = (value: number): number =>
  Math.round(value * 100) / 100;

/**
 * The growth factor for one month, given a nominal annual rate compounded
 * `periodsPerYear` times.
 *
 * Contributions arrive monthly whatever the compounding frequency, so the
 * simulation steps monthly and the frequency is folded into the factor: the
 * nominal rate becomes an effective annual rate, and that is taken to the
 * twelfth root. Quarterly compounding at 7% is therefore genuinely worth
 * slightly less than monthly compounding at 7%, which is the whole reason the
 * input exists.
 */
export const monthlyGrowthFactor = (
  annualRatePercent: number,
  periodsPerYear: number,
): number => {
  const nominal = asFraction(annualRatePercent);
  const effectiveAnnual = (1 + nominal / periodsPerYear) ** periodsPerYear - 1;
  return (1 + effectiveAnnual) ** (1 / 12);
};

/**
 * What `x` was worth in the money of `years` ago, at a constant rate.
 *
 * Deflation is division, not subtraction: prices compound like everything
 * else. Stating it here stops each calculator inventing its own version.
 */
export const deflate = (
  nominal: number,
  inflationPercent: number,
  years: number,
): number => nominal / (1 + asFraction(inflationPercent)) ** years;
