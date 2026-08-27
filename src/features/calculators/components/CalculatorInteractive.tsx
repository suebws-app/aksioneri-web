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

/**
 * The one client island on a calculator page.
 *
 * Everything else — the heading, the explanation, the FAQ, the first render of
 * this very result — is server-rendered, so a shared link works with
 * JavaScript disabled and a crawler sees a real answer rather than an empty
 * shell. This component takes over afterwards and recalculates as the reader
 * types.
 *
 * **There is no debounce on the arithmetic.** Every engine function is linear
 * in the number of periods, capped at 1,200; the whole recalculation is a
 * few microseconds. Debouncing it would add lag a reader can feel in exchange
 * for nothing. Only the URL write is debounced, and for a different reason —
 * see `useShareableUrl`.
 *
 * Form state is strings, keyed by field name, held in `useState` rather than
 * React Hook Form. RHF earns its place when a form submits; this one never
 * does. What it needs is a value that survives mid-edit states like `1.` and
 * an empty field, which is exactly what RHF's coercion would take away.
 * Validation still runs through the definition's zod schema on every change,
 * so the messages are the same ones a submitted form would produce.
 */

interface CalculatorInteractiveProps {
  /**
   * The calculator to render, by slug.
   *
   * A slug rather than the definition itself, and not by preference: a
   * definition holds `compute`, `schema` and the codec, and React Server
   * Components cannot serialise a function across the boundary. Passing the
   * object throws "Functions cannot be passed directly to Client Components"
   * at render time.
   *
   * So the island resolves it from the registry, which is plain TypeScript
   * and bundles into the client fine — and has to, because the whole point is
   * that the arithmetic runs in the browser as the reader types.
   */
  slug: string;
  /** Decoded from `searchParams` on the server; the starting point. */
  initialInput: Record<string, unknown>;
  ctx: ComputeContext;
}

/** Strings for the form, from the typed input the server decoded. */
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
  // Resolved here and handed down as a prop, rather than looked up inside the
  // component below, so that the null case is settled before any hook runs —
  // an early return after `useState` would be a hooks-order violation.
  //
  // The route 404s on an unknown slug, so in practice this is never null.
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

  /**
   * Strings back to the typed shape the engine expects.
   *
   * An unparseable numeric field becomes `NaN` rather than being dropped or
   * defaulted, so the engine sees it, refuses, and the reader is told which
   * assumption could not be used — instead of the page quietly computing with
   * a value they did not enter.
   */
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
      // First message per field: a stack of three errors under one input is
      // noise, and the first is the one the reader can act on.
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

  // Only non-default values reach the URL, so a reader who changed nothing
  // gets the bare canonical path.
  const urlParams = useMemo(
    () =>
      calculator.urlCodec.encode(parsed as never, calculator.defaults as never),
    [calculator, parsed],
  );

  const { commit } = useShareableUrl(urlParams);

  // Anonymous counters: a slug and an event name, nothing else. See
  // `useCalculatorEvent.ts` for what is deliberately not sent.
  useCalculatorView(calculator.slug);
  const reportEvent = useCalculatorReporter();

  // "Used" means the reader changed something, not that the page loaded with
  // its defaults — otherwise every view would also count as a calculation and
  // the two numbers would say the same thing. Counted once per visit.
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
          {/* The converter chooses its own currencies in its own fields, so a
              page-level EUR/USD toggle would sit above them changing nothing
              — and implying the result was denominated by it. */}
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
                // Flush the URL immediately rather than after the debounce —
                // but as a replace. Toggling back and forth to compare must
                // not bury the page under Back presses.
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
          // A refusal, not a blank. The engine says which assumption it could
          // not use, and the reader is told rather than shown a broken figure.
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

        {/* Provenance sits with the result, not in a footnote: it qualifies
            the number directly above it. */}
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
