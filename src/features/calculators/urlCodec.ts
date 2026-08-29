import { clamp } from './engine';
import type { FieldSpec, UrlCodec } from './types';

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const MAX_VALUE_LENGTH = 24;

const readNumber = (
  raw: string | string[] | undefined,
  fallback: number,
  min: number,
  max: number,
): number => {
  const value = first(raw);
  if (value === undefined || value.length > MAX_VALUE_LENGTH) return fallback;

  const parsed = Number(value.trim().replace(',', '.'));

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

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const readDate = (
  raw: string | string[] | undefined,
  fallback: string,
): string => {
  const value = first(raw);
  if (value === undefined || !DATE_PATTERN.test(value)) return fallback;

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return parsed.toISOString().slice(0, 10) === value ? value : fallback;
};

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
