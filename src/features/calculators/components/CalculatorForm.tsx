'use client';

import { useTranslations } from 'next-intl';
import { DatePicker } from '@/components/DatePicker';
import { Field } from '@/components/Field';
import { NumericInput } from '@/components/NumericInput';
import { Select } from '@/components/Select';
import { SegmentedControl } from '@/components/SegmentedControl';
import type { Currency } from '@/lib/format/money';
import type { AnyCalculator, FieldSpec } from '../types';

export type FormValues = Record<string, string>;

interface CalculatorFormProps {
  calculator: AnyCalculator;
  values: FormValues;
  errors: Partial<Record<string, string>>;
  currency: Currency;
  onChange: (name: string, value: string) => void;
  showAdvanced: boolean;
}

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
                    <DatePicker
                      id={id}
                      value={value}
                      aria-describedby={describedBy}
                      invalid={invalid}
                      placeholder={shared('ui.pickDate')}
                      onChange={(next) => {
                        onChange(name, next);
                      }}
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
