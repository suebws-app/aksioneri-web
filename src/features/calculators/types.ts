import type { z } from 'zod';
import type { ComputeContext, Currency, Outcome } from './engine';

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

export type DisclaimerKind = 'general' | 'loan' | 'investment' | 'tax' | 'fx';

export type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface FieldBase {
  param?: string;
  advanced?: boolean;
}

export type FieldSpec<TInput> =
  | (FieldBase & {
      kind: 'currency';
      name: NumericKeys<TInput>;
      min: number;
      max: number;
      step: number;
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

export interface UrlCodec<TInput> {
  encode: (input: TInput, defaults: TInput) => Record<string, string>;
  decode: (
    params: Record<string, string | string[] | undefined>,
    defaults: TInput,
  ) => TInput;
}

export type NumberFormatKind =
  | 'money'
  | 'moneyWhole'
  | 'percent'
  | 'percentChange'
  | 'years'
  | 'plain'
  | 'rate';

export interface ResultFigure {
  labelKey: string;
  value: number;
  format: NumberFormatKind;
  currency?: string;
  projected?: boolean;
}

export interface ResultSpec {
  primary: ResultFigure;
  secondary: readonly ResultFigure[];
  table?: {
    columnKeys: readonly string[];
    rows: readonly (readonly ResultFigure[])[];
    previewRows: number;
  };
}

export interface ChartSeries {
  idKey: string;
  values: readonly number[];
  emphasis?: boolean;
}

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

export type MarketDataNeed =
  | { kind: 'none' }
  | { kind: 'fxRate'; defaultBase: Currency; defaultQuote: Currency }
  | { kind: 'fxSeries' }
  | { kind: 'quote'; defaultSymbol: string }
  | { kind: 'dailyCloses'; defaultSymbol: string }
  | { kind: 'inflationSeries'; defaultSeries: string }
  | { kind: 'policyRate'; defaultSeries: string };

export interface CalculatorEngine<TInput extends object, TResult> {
  slug: CalculatorSlug;
  schema: (t: Translate) => z.ZodType<TInput>;
  defaults: TInput;
  fields: readonly FieldSpec<TInput>[];
  urlCodec: UrlCodec<TInput>;
  compute: (input: TInput, ctx: ComputeContext) => Outcome<TResult>;
  ownsCurrency?: boolean;
  toResultSpec: (result: TResult, input: TInput) => ResultSpec;
  toChartSpec?: (result: TResult, input: TInput) => ChartSpec;
  marketData: MarketDataNeed;
}

export interface CalculatorEditorial {
  category: CalculatorCategory;
  messageKey: string;
  disclaimer: DisclaimerKind;
  newsPhrases: readonly string[];
  relatedSlugs: readonly CalculatorSlug[];
  faqCount: number;
  embeddableIn: readonly string[];
  order: number;
}

export type CalculatorDefinition<
  TInput extends object,
  TResult,
> = CalculatorEngine<TInput, TResult> & CalculatorEditorial;

export type AnyCalculator = CalculatorDefinition<never, never>;
