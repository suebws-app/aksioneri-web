import { clamp } from './engine';
import type { FieldSpec, UrlCodec } from './types';

/**
 * Builds a calculator's query-string codec from the fields it already
 * declares.
 *
 * Every calculator needs the same thing — read numbers back out of a URL,
 * clamp them to the range the field advertises, fall back to the default when
 * they are unusable — and hand-writing that per calculator is ten chances to
 * get the clamping subtly different. Since `FieldSpec` already carries the
 * bounds and the allowed options, the codec can be derived rather than
 * written, and calculator #11 gets a correct one for free.
 *
 * Two properties this must hold, both covered by tests:
 *
 * - **`decode` never throws.** A shared link is the one URL guaranteed to
 *   have been edited by hand. One unusable parameter costs that field its
 *   value, not the page its render.
 * - **`encode` omits defaults.** Otherwise every visit rewrites the address
 *   bar with a dozen parameters the reader never set, and the canonical URL
 *   stops matching the one people copy.
 */

/** A repeated parameter (`?rate=5&rate=7`) arrives as an array; take the first. */
const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/**
 * Longest parameter value considered at all.
 *
 * `Number('9'.repeat(10000))` is `Infinity`, and the guards would refuse it
 * correctly — but there is no reason to hand a megabyte of digits to the
 * parser in the first place.
 */
const MAX_VALUE_LENGTH = 24;

const readNumber = (
  raw: string | string[] | undefined,
  fallback: number,
  min: number,
  max: number,
): number => {
  const value = first(raw);
  if (value === undefined || value.length > MAX_VALUE_LENGTH) return fallback;

  // A comma is what an Albanian reader types, and what a European locale's
  // copy-paste produces. Accepting it here costs nothing and avoids a field
  // silently resetting to its default.
  const parsed = Number(value.trim().replace(',', '.'));

  // NaN and Infinity both fail this, so neither reaches the engine.
  if (!Number.isFinite(parsed)) return fallback;

  return clamp(parsed, min, max);
};

const readOption = (
  raw: string | string[] | undefined,
  fallback: string,
  options: readonly string[],
): string => {
  const value = first(raw);
  return value !== undefined && options.includes(value) ? value : fallback;
};

/** ISO calendar date, and only that. */
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const readDate = (
  raw: string | string[] | undefined,
  fallback: string,
): string => {
  const value = first(raw);
  if (value === undefined || !DATE_PATTERN.test(value)) return fallback;

  // Shape is not validity: 2026-02-31 matches the pattern. Parsing at UTC
  // midnight, as the calendar feature does, keeps the check timezone-free.
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return fallback;

  // Round-tripping catches a rolled-over date — 2026-02-31 becomes 2026-03-03,
  // which no longer equals what was asked for.
  return parsed.toISOString().slice(0, 10) === value ? value : fallback;
};

/** Trailing zeros in a URL are noise: `7` reads better than `7.00`. */
const encodeNumber = (value: number): string => String(value);

export function createUrlCodec<TInput extends object>(
  fields: readonly FieldSpec<TInput>[],
): UrlCodec<TInput> {
  const paramFor = (field: FieldSpec<TInput>): string =>
    field.param ?? String(field.name);

  return {
    encode(input, defaults) {
      const params: Record<string, string> = {};

      for (const field of fields) {
        const key = field.name as keyof TInput;
        const value = input[key];
        const fallback = defaults[key];

        if (value === fallback) continue;

        params[paramFor(field)] =
          typeof value === 'number' ? encodeNumber(value) : String(value);
      }

      return params;
    },

    decode(params, defaults) {
      // Start from the defaults and overwrite what the URL usefully supplies,
      // so a field the URL never mentions is not merely unset but correct.
      const result = { ...defaults };

      for (const field of fields) {
        const raw = params[paramFor(field)];
        const key = field.name as keyof TInput;

        switch (field.kind) {
          case 'currency':
          case 'percent':
          case 'number':
            result[key] = readNumber(
              raw,
              defaults[key] as number,
              field.min,
              field.max,
            ) as TInput[keyof TInput];
            break;

          case 'select':
          case 'segmented':
            result[key] = readOption(
              raw,
              defaults[key] as string,
              field.options,
            ) as TInput[keyof TInput];
            break;

          case 'date':
            result[key] = readDate(
              raw,
              defaults[key] as string,
            ) as TInput[keyof TInput];
            break;
        }
      }

      return result;
    },
  };
}
