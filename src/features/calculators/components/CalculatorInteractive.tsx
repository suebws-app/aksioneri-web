'use client';

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/Button';
import { SegmentedControl } from '@/components/SegmentedControl';
import type { Currency } from '@/lib/format/money';
import type { ComputeContext, Outcome } from '../engine';
import { getCalculator } from '../registry';
import type { AnyCalculator, ChartSpec, FieldSpec, ResultSpec } from '../types';
import {
  useCalculatorReporter,
  useCalculatorView,
} from '../useCalculatorEvent';
import { useShareableUrl } from '../useShareableUrl';
import { CalculatorChart } from './CalculatorChart';
import { DataSource } from './DataSource';
import { CalculatorForm, type FormValues } from './CalculatorForm';
import { ResultCard } from './ResultCard';

interface CalculatorInteractiveProps {
  slug: string;
  initialInput: Record<string, unknown>;
  ctx: ComputeContext;
}

const toFormValues = (input: Record<string, unknown>): FormValues =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, String(value)]),
  );

const CURRENCIES: Currency[] = ['EUR', 'USD'];

export function CalculatorInteractive({
  slug,
  initialInput,
  ctx,
}: CalculatorInteractiveProps) {
  const calculator = getCalculator(slug);
  if (!calculator) return null;

  return (
    <CalculatorIsland
      calculator={calculator}
      initialInput={initialInput}
      ctx={ctx}
    />
  );
}

interface CalculatorIslandProps {
  calculator: AnyCalculator;
  initialInput: Record<string, unknown>;
  ctx: ComputeContext;
}

function CalculatorIsland({
  calculator,
  initialInput,
  ctx,
}: CalculatorIslandProps) {
  const t = useTranslations('calculators');

  const [values, setValues] = useState<FormValues>(() =>
    toFormValues(initialInput),
  );
  const [currency, setCurrency] = useState<Currency>(ctx.currency);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fields = calculator.fields as readonly FieldSpec<never>[];

  const parsed = useMemo(() => {
    const input: Record<string, unknown> = {};

    for (const field of fields) {
      const name = String(field.name);
      const raw = values[name] ?? '';

      input[name] =
        field.kind === 'select' ||
        field.kind === 'segmented' ||
        field.kind === 'date'
          ? raw
          : Number(raw.trim().replace(',', '.'));
    }

    return input;
  }, [fields, values]);

  const errors = useMemo(() => {
    const result = calculator.schema(t).safeParse(parsed);
    if (result.success) return {};

    const messages: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !(key in messages)) {
        messages[key] = issue.message;
      }
    }
    return messages;
  }, [calculator, parsed, t]);

  const outcome = useMemo(
    () =>
      calculator.compute(parsed as never, {
        ...ctx,
        currency,
      }) as Outcome<never>,
    [calculator, parsed, ctx, currency],
  );

  const resultSpec: ResultSpec | null = useMemo(
    () =>
      outcome.ok
        ? calculator.toResultSpec(outcome.value, parsed as never)
        : null,
    [calculator, outcome, parsed],
  );

  const chartSpec: ChartSpec | null = useMemo(
    () =>
      outcome.ok && calculator.toChartSpec
        ? calculator.toChartSpec(outcome.value, parsed as never)
        : null,
    [calculator, outcome, parsed],
  );

  const urlParams = useMemo(
    () =>
      calculator.urlCodec.encode(parsed as never, calculator.defaults as never),
    [calculator, parsed],
  );

  const { commit } = useShareableUrl(urlParams);

  useCalculatorView(calculator.slug);
  const reportEvent = useCalculatorReporter();

  const countedCompute = useRef(false);

  const handleChange = (name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));

    if (!countedCompute.current) {
      countedCompute.current = true;
      reportEvent(calculator.slug, 'compute');
    }
  };

  const handleReset = () => {
    setValues(toFormValues(calculator.defaults as Record<string, unknown>));
  };

  const hasAdvanced = fields.some((field) => field.advanced);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
      <section aria-labelledby="calculator-inputs">
        <h2 id="calculator-inputs" className="sr-only">
          {t('ui.resultsHeading')}
        </h2>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {calculator.ownsCurrency ? (
            <span />
          ) : (
            <SegmentedControl
              name="currency"
              legend={t('ui.currencyLabel')}
              value={currency}
              options={CURRENCIES.map((code) => ({ value: code, label: code }))}
              onChange={(next) => {
                setCurrency(next as Currency);
                commit();
              }}
            />
          )}

          <Button intent="ghost" size="sm" onClick={handleReset}>
            {t('ui.reset')}
          </Button>
        </div>

        <CalculatorForm
          calculator={calculator}
          values={values}
          errors={errors}
          currency={currency}
          onChange={handleChange}
          showAdvanced={showAdvanced}
        />

        {hasAdvanced ? (
          <Button
            intent="outline"
            size="sm"
            className="mt-5"
            aria-expanded={showAdvanced}
            onClick={() => {
              setShowAdvanced((previous) => !previous);
            }}
          >
            {t('ui.advancedOptions')}
          </Button>
        ) : null}
      </section>

      <section aria-live="polite">
        {resultSpec ? (
          <ResultCard
            calculator={calculator}
            spec={resultSpec}
            currency={currency}
          />
        ) : (
          <div
            role="alert"
            className="border-line bg-surface rounded-sm border p-6"
          >
            <h2 className="text-ink mb-2 font-serif text-[21px] font-medium">
              {t('refusals.heading')}
            </h2>
            <p className="text-ink-body text-[15px] leading-relaxed text-pretty">
              {t(`refusals.${outcome.ok ? 'nonFinite' : outcome.reason}`)}
            </p>
          </div>
        )}

        <DataSource date={ctx.dataDate} source={ctx.dataSource} />

        {chartSpec ? (
          <CalculatorChart
            calculator={calculator}
            spec={chartSpec}
            currency={currency}
          />
        ) : null}
      </section>
    </div>
  );
}
