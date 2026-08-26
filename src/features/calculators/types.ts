import type { z } from 'zod';
import type { ComputeContext, Currency, Outcome } from './engine';

/**
 * The calculator contract.
 *
 * Everything a calculator page needs is declared here, so the page itself is
 * generic: it looks a definition up by slug, renders the fields the definition
 * declares, calls the function it names, and formats the result it describes.
 * Adding the eleventh calculator is a definition file and a registry line — no
 * new route, no new component, no new page.
 *
 * The contract is split in two at the seam a CMS would cut. `CalculatorEngine`
 * is code and always will be: a `compute` function cannot live in a database
 * without inventing an expression language, and that road ends at `eval`.
 * `CalculatorEditorial` is the half a CMS could serve — categories, related
 * links, which article types may embed it — and the copy it points at already
 * lives outside the code, in the message catalogue.
 */

export type CalculatorSlug =
  | 'compound-interest'
  | 'cagr'
  | 'loan-amortization'
  | 'mortgage'
  | 'inflation-adjustment'
  | 'dividend-reinvestment'
  | 'dollar-cost-averaging'
  | 'retirement'
  | 'currency-converter'
  | 'percentage-return'
  | 'stock-profit';

export type CalculatorCategory =
  | 'investing'
  | 'markets'
  | 'personal-finance'
  | 'borrowing'
  | 'retirement'
  | 'economy'
  | 'currency';

/**
 * Which caveat a result carries.
 *
 * A projection, a loan estimate and a tax figure need materially different
 * warnings, and the difference matters legally as much as editorially. Making
 * it an enum means a calculator cannot ship without choosing one.
 */
export type DisclaimerKind = 'general' | 'loan' | 'investment' | 'tax' | 'fx';

/** next-intl's `t`, kept structural so schema factories stay portable. */
export type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

/** Field names on `TInput` whose value is a number. */
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

/** Field names on `TInput` whose value is a string. */
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

/** What every field declares, whatever its kind. */
interface FieldBase {
  /**
   * The query-string key, when it should differ from the field name.
   *
   * Field names are written for the code (`ratePercent`, `inflationPercent`);
   * URLs are written for people, and end up in articles and shared messages.
   * `?rate=7&inflation=2` is the shape the spec asks for, and it is also the
   * one that survives being pasted into a sentence.
   *
   * Changing this breaks every link already shared. Treat it as public API.
   */
  param?: string;
  /** Hidden until "advanced options" is opened. */
  advanced?: boolean;
}

/**
 * How one input is rendered.
 *
 * Structure only — no labels, no hints, no placeholder text. Every string a
 * reader sees comes from the message catalogue, keyed off the field's name, so
 * a definition file contains no Albanian and a translator never opens one.
 */
export type FieldSpec<TInput> =
  | (FieldBase & {
      kind: 'currency';
      name: NumericKeys<TInput>;
      min: number;
      max: number;
      step: number;
      /**
       * Name of another field holding the ISO code this amount is in.
       *
       * The converter's amount is in whatever "Prej" says, not in the page's
       * currency — showing `€` beside a sum the reader entered as dollars is
       * simply the wrong label.
       */
      currencyFrom?: StringKeys<TInput>;
    })
  | (FieldBase & {
      kind: 'percent';
      name: NumericKeys<TInput>;
      min: number;
      max: number;
      step: number;
    })
  | (FieldBase & {
      kind: 'number';
      name: NumericKeys<TInput>;
      min: number;
      max: number;
      step: number;
      /** Message key for the unit shown after the digits, e.g. `units.years`. */
      unitKey?: string;
    })
  | (FieldBase & { kind: 'date'; name: StringKeys<TInput> })
  | (FieldBase & {
      kind: 'select';
      name: StringKeys<TInput>;
      options: readonly string[];
    })
  | (FieldBase & {
      kind: 'segmented';
      name: StringKeys<TInput>;
      options: readonly string[];
    });

/**
 * Reads and writes the query string.
 *
 * Pure and zod-free so it can be exercised directly against hostile input —
 * `?years=NaN`, a repeated parameter, a ten-kilobyte string — without
 * standing a form up. `decode` never throws: an unusable value falls back to
 * the default for that field alone, so one broken parameter in a shared link
 * costs one field rather than the whole page.
 */
export interface UrlCodec<TInput> {
  /** Omits anything equal to its default, keeping the canonical URL bare. */
  encode: (input: TInput, defaults: TInput) => Record<string, string>;
  decode: (
    params: Record<string, string | string[] | undefined>,
    defaults: TInput,
  ) => TInput;
}

/** How a figure should be rendered. */
export type NumberFormatKind =
  | 'money'
  | 'moneyWhole'
  | 'percent'
  | 'percentChange'
  | 'years'
  | 'plain'
  /**
   * An exchange rate or similar ratio.
   *
   * Its own kind because `plain` rounds to whole units, which turns a
   * USD/GBP rate of 0.7336 into "1" — a figure that is not merely imprecise
   * but wrong, and wrong in a way that looks deliberate.
   */
  | 'rate';

export interface ResultFigure {
  /** Message key under the calculator's `results` subtree. */
  labelKey: string;
  value: number;
  format: NumberFormatKind;
  /**
   * Denomination for this figure, when it differs from the page's currency.
   *
   * The converter needs it: its result is in the target currency, not in
   * whatever the site-wide toggle happens to say. Labelling a dollar amount
   * with a euro sign is not a cosmetic slip — it is the wrong number.
   */
  currency?: string;
  /**
   * Marks a figure as an assumption-driven projection rather than arithmetic
   * on what the reader typed. The UI flags these, per the spec's requirement
   * that a calculated result and a market assumption be distinguishable.
   */
  projected?: boolean;
}

export interface ResultSpec {
  /** The one number the page is about. Rendered largest. */
  primary: ResultFigure;
  secondary: readonly ResultFigure[];
  /** A row-level breakdown: an amortisation schedule, a year-by-year table. */
  table?: {
    columnKeys: readonly string[];
    rows: readonly (readonly ResultFigure[])[];
    /** Rows past this collapse behind a disclosure. */
    previewRows: number;
  };
}

/**
 * A chart, described rather than drawn.
 *
 * The definition says what the shape of the data is; the chart kit decides how
 * to draw it. Series carry message keys, not labels, for the same reason
 * fields do.
 */
export interface ChartSeries {
  /** Message key, relative to the calculator's subtree. */
  idKey: string;
  values: readonly number[];
  /** Draws this series as the subject and the rest as context. */
  emphasis?: boolean;
}

/**
 * A chart, described rather than drawn.
 *
 * The definition says what shape the data is; the chart kit decides how to
 * draw it. Series carry message keys rather than labels, for the same reason
 * fields do — a definition file contains no Albanian.
 *
 * Only the two kinds that ship today are declared. Donut and bar charts
 * arrive with the mortgage calculator, which is the first thing that needs
 * them; adding a variant here without a renderer would either break the
 * exhaustive switch in `CalculatorChart` or, worse, silently render nothing.
 */
export type ChartSpec =
  | {
      kind: 'stackedArea';
      xLabelKey: string;
      x: readonly number[];
      series: readonly ChartSeries[];
    }
  | {
      kind: 'line';
      xLabelKey: string;
      x: readonly number[];
      series: readonly ChartSeries[];
    };

/**
 * What must be fetched before this calculator can produce a number.
 *
 * Declared rather than discovered, so the page knows whether it needs the
 * loading, error and empty states at all — and so a calculator that needs a
 * series can never quietly fall back to a hardcoded one.
 */
export type MarketDataNeed =
  | { kind: 'none' }
  | { kind: 'fxRate'; defaultBase: Currency; defaultQuote: Currency }
  | { kind: 'fxSeries' }
  | { kind: 'quote'; defaultSymbol: string }
  | { kind: 'dailyCloses'; defaultSymbol: string }
  | { kind: 'inflationSeries'; defaultSeries: string }
  | { kind: 'policyRate'; defaultSeries: string };

/** The half that is code. */
export interface CalculatorEngine<TInput extends object, TResult> {
  slug: CalculatorSlug;
  /** Takes the translator so validation messages are localised. */
  schema: (t: Translate) => z.ZodType<TInput>;
  defaults: TInput;
  fields: readonly FieldSpec<TInput>[];
  urlCodec: UrlCodec<TInput>;
  /** Pure. Lives in `engine/`, which may not import React, zod or `@/`. */
  compute: (input: TInput, ctx: ComputeContext) => Outcome<TResult>;
  /**
   * This calculator picks its own currencies, so the page hides the global
   * EUR/USD toggle.
   *
   * Leaving the toggle visible on the converter was actively misleading: it
   * sat above two currency selects, changed nothing, and implied the result
   * was denominated by it.
   */
  ownsCurrency?: boolean;
  toResultSpec: (result: TResult, input: TInput) => ResultSpec;
  toChartSpec?: (result: TResult, input: TInput) => ChartSpec;
  marketData: MarketDataNeed;
}

/** The half a CMS could one day serve. */
export interface CalculatorEditorial {
  category: CalculatorCategory;
  /** Root of the i18n subtree: `calculators.<messageKey>`. */
  messageKey: string;
  disclaimer: DisclaimerKind;
  /** Scored against article text to decide which calculator an article embeds. */
  newsPhrases: readonly string[];
  relatedSlugs: readonly CalculatorSlug[];
  /** Asserted against the message catalogue by the registry meta-test. */
  faqCount: number;
  /** Article categories this calculator may be embedded in. */
  embeddableIn: readonly string[];
  /** Ranks the landing page's "popular" rail. Lower sorts first. */
  order: number;
}

export type CalculatorDefinition<
  TInput extends object,
  TResult,
> = CalculatorEngine<TInput, TResult> & CalculatorEditorial;

/**
 * The registry's value type.
 *
 * The generics are erased because no consumer needs them: a page looks a
 * calculator up by a string slug and can know nothing about its input shape.
 * `never` for the parameters keeps every concrete definition assignable while
 * making an unchecked call impossible without going through the definition's
 * own functions.
 */
export type AnyCalculator = CalculatorDefinition<never, never>;
