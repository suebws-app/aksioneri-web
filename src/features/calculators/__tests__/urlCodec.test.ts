import { describe, expect, it } from 'vitest';
import { getCalculators } from '../registry';
import type { AnyCalculator } from '../types';

const calculators = getCalculators();

const defaultsOf = (calculator: AnyCalculator): Record<string, unknown> =>
  calculator.defaults as unknown as Record<string, unknown>;

describe.each(calculators.map((c) => [c.slug, c] as const))(
  'urlCodec: %s',
  (_slug, calculator) => {
    const defaults = defaultsOf(calculator);

    it('round-trips a non-default input unchanged', () => {
      const modified: Record<string, unknown> = { ...defaults };

      for (const field of calculator.fields) {
        const name = String(field.name);
        if (field.kind === 'select' || field.kind === 'segmented') {
          const other = field.options.find(
            (option) => option !== defaults[name],
          );
          if (other) modified[name] = other;
        } else if (field.kind !== 'date') {
          modified[name] = Math.min(
            (defaults[name] as number) + field.step,
            field.max,
          );
        }
      }

      const params = calculator.urlCodec.encode(
        modified as never,
        defaults as never,
      );
      const decoded = calculator.urlCodec.decode(params, defaults as never);

      expect(decoded).toEqual(modified);
    });

    it('writes nothing when every value is its default', () => {
      const params = calculator.urlCodec.encode(
        defaults as never,
        defaults as never,
      );

      expect(Object.keys(params)).toHaveLength(0);
    });

    it('falls back to defaults for an empty query', () => {
      expect(calculator.urlCodec.decode({}, defaults as never)).toEqual(
        defaults,
      );
    });

    it('survives hostile input without throwing', () => {
      const hostile: Record<string, string | string[] | undefined> = {};

      for (const field of calculator.fields) {
        hostile[field.param ?? String(field.name)] = 'not-a-number';
      }

      const decoded = calculator.urlCodec.decode(hostile, defaults as never);

      expect(decoded).toEqual(defaults);
    });

    it('clamps a finite out-of-range number to the field bounds', () => {
      for (const field of calculator.fields) {
        if (
          field.kind === 'select' ||
          field.kind === 'segmented' ||
          field.kind === 'date'
        ) {
          continue;
        }

        const name = String(field.name);
        const key = field.param ?? name;

        expect(
          calculator.urlCodec.decode(
            { [key]: String(field.max * 10) },
            defaults as never,
          )[name as never],
        ).toBe(field.max);

        expect(
          calculator.urlCodec.decode(
            { [key]: String(field.min - 1000) },
            defaults as never,
          )[name as never],
        ).toBe(field.min);
      }
    });

    it('falls back rather than clamping when a value overflows to Infinity', () => {
      for (const field of calculator.fields) {
        if (
          field.kind !== 'currency' &&
          field.kind !== 'percent' &&
          field.kind !== 'number'
        ) {
          continue;
        }

        const name = String(field.name);
        const key = field.param ?? name;

        expect(
          calculator.urlCodec.decode({ [key]: '1e999' }, defaults as never)[
            name as never
          ],
        ).toBe(defaults[name]);
      }
    });

    it('ignores NaN, repeated params and oversized values', () => {
      for (const field of calculator.fields) {
        if (
          field.kind !== 'currency' &&
          field.kind !== 'percent' &&
          field.kind !== 'number'
        ) {
          continue;
        }

        const name = String(field.name);
        const key = field.param ?? name;

        expect(
          calculator.urlCodec.decode({ [key]: 'NaN' }, defaults as never)[
            name as never
          ],
        ).toBe(defaults[name]);

        expect(
          calculator.urlCodec.decode(
            { [key]: '9'.repeat(10_000) },
            defaults as never,
          )[name as never],
        ).toBe(defaults[name]);

        const repeated = calculator.urlCodec.decode(
          { [key]: [String(field.min), String(field.max)] },
          defaults as never,
        );
        expect(repeated[name as never]).toBe(field.min);
      }
    });

    it('accepts a comma as a decimal separator', () => {
      const numeric = calculator.fields.find(
        (
          field,
        ): field is Extract<
          (typeof calculator.fields)[number],
          { kind: 'percent' | 'currency' }
        > => field.kind === 'percent' || field.kind === 'currency',
      );
      if (!numeric) return;

      const key = numeric.param ?? String(numeric.name);
      const decoded = calculator.urlCodec.decode(
        { [key]: '7,5' },
        defaults as never,
      );

      expect(decoded[String(numeric.name) as never]).toBe(7.5);
    });

    it('rejects an unknown option rather than passing it through', () => {
      for (const field of calculator.fields) {
        if (field.kind !== 'select' && field.kind !== 'segmented') continue;

        const name = String(field.name);
        const key = field.param ?? name;

        expect(
          calculator.urlCodec.decode(
            { [key]: 'definitely-not-an-option' },
            defaults as never,
          )[name as never],
        ).toBe(defaults[name]);
      }
    });
  },
);

describe('the spec’s example URL', () => {
  it('reproduces the calculation it describes', () => {
    const compound = calculators.find((c) => c.slug === 'compound-interest');
    if (!compound) throw new Error('compound-interest is not registered');

    const decoded = compound.urlCodec.decode(
      { initial: '10000', monthly: '500', rate: '7', years: '20' },
      compound.defaults as never,
    ) as unknown as Record<string, unknown>;

    expect(decoded.initial).toBe(10_000);
    expect(decoded.monthly).toBe(500);
    expect(decoded.ratePercent).toBe(7);
    expect(decoded.years).toBe(20);
  });
});
