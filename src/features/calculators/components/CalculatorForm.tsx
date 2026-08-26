'use client';

import { useTranslations } from 'next-intl';
import { Field } from '@/components/Field';
import { NumericInput } from '@/components/NumericInput';
import { Select } from '@/components/Select';
import { SegmentedControl } from '@/components/SegmentedControl';
import type { Currency } from '@/lib/format/money';
import type { AnyCalculator, FieldSpec } from '../types';

/**
 * Renders whatever fields a calculator declares.
 *
 * This is the file that makes the eleventh calculator free. A definition lists
 * its fields with their kinds and bounds; this walks that list. No calculator
 * has, or needs, a form component of its own.
 *
 * Values are held as **strings**, not numbers. A reader typing `1.` or
 * clearing a field to retype it is mid-edit, not in error, and coercing on
 * every keystroke makes the field fight back — the cursor jumps, a leading
 * zero vanishes, an emptied field refills with `0`. The string is the truth
 * while editing; the parent parses it and the engine refuses anything that
 * does not survive parsing.
 */

export type FormValues = Record<string, string>;

interface CalculatorFormProps {
  calculator: AnyCalculator;
  values: FormValues;
  errors: Partial<Record<string, string>>;
  currency: Currency;
  onChange: (name: string, value: string) => void;
  /** Advanced fields are hidden until the reader opens them. */
  showAdvanced: boolean;
}

/**
 * Affix for a currency field.
 *
 * A field may declare that its denomination lives in another field
 * (`currencyFrom`), which is how the converter's amount follows the "Prej"
 * select. Otherwise it takes the page's currency. Anything without a familiar
 * glyph falls back to its ISO code rather than a symbol readers would
 * misread.
 */
const CURRENCY_SYMBOL: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
};

const symbolFor = (code: string): string => CURRENCY_SYMBOL[code] ?? code;

export function CalculatorForm({
  calculator,
  values,
  errors,
  currency,
  onChange,
  showAdvanced,
}: CalculatorFormProps) {
  const t = useTranslations(`calculators.${calculator.messageKey}`);
  const shared = useTranslations('calculators');

  const visible = calculator.fields.filter(
    (field: FieldSpec<never>) => showAdvanced || !field.advanced,
  );

  return (
    <div className="flex flex-col gap-5">
      {visible.map((field: FieldSpec<never>) => {
        const name = String(field.name);
        const value = values[name] ?? '';
        const error = errors[name];

        return (
          <Field
            key={name}
            name={name}
            label={t(`fields.${name}.label`)}
            hint={t(`fields.${name}.hint`)}
            {...(error ? { error } : {})}
          >
            {({ id, describedBy, invalid }) => {
              switch (field.kind) {
                case 'currency':
                case 'percent':
                case 'number':
                  return (
                    <NumericInput
                      id={id}
                      name={name}
                      value={value}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      onChange={(event) => {
                        onChange(name, event.target.value);
                      }}
                      {...(field.kind === 'currency'
                        ? {
                            leading: symbolFor(
                              field.currencyFrom
                                ? (values[String(field.currencyFrom)] ??
                                    currency)
                                : currency,
                            ),
                          }
                        : {})}
                      {...(field.kind === 'percent' ? { trailing: '%' } : {})}
                      {...(field.kind === 'number' && field.unitKey
                        ? { trailing: shared(field.unitKey) }
                        : {})}
                    />
                  );

                case 'select':
                  return (
                    <Select
                      id={id}
                      name={name}
                      value={value}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      options={field.options.map((option) => ({
                        value: option,
                        label: t(`options.${name}.${option}`),
                      }))}
                      onChange={(event) => {
                        onChange(name, event.target.value);
                      }}
                    />
                  );

                case 'segmented':
                  return (
                    <SegmentedControl
                      name={name}
                      legend={t(`fields.${name}.label`)}
                      value={value}
                      options={field.options.map((option) => ({
                        value: option,
                        label: t(`options.${name}.${option}`),
                      }))}
                      onChange={(next) => {
                        onChange(name, next);
                      }}
                    />
                  );

                case 'date':
                  return (
                    <input
                      type="date"
                      id={id}
                      name={name}
                      value={value}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      onChange={(event) => {
                        onChange(name, event.target.value);
                      }}
                      className="border-line-strong bg-surface text-ink focus:border-accent min-h-11 w-full rounded-sm border px-3.5 py-2.5 font-mono text-[15px] outline-none"
                    />
                  );
              }
            }}
          </Field>
        );
      })}
    </div>
  );
}
