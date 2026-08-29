import { z } from 'zod';
import {
  computeDca,
  MAX_YEARS,
  type DcaInput,
  type DcaResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const FREQUENCIES = ['monthly', 'quarterly', 'annually'] as const;

const defaults: DcaInput = {
  initial: 0,
  contribution: 200,
  frequency: 'monthly',
  ratePercent: 7,
  years: 15,
  inflationPercent: 2,
};

const fields: readonly FieldSpec<DcaInput>[] = [
  {
    kind: 'currency',
    name: 'contribution',
    param: 'monthly',
    min: 0,
    max: 1e8,
    step: 50,
  },
  {
    kind: 'percent',
    name: 'ratePercent',
    param: 'rate',
    min: -50,
    max: 50,
    step: 0.1,
  },
  {
    kind: 'number',
    name: 'years',
    param: 'years',
    min: 1,
    max: MAX_YEARS,
    step: 1,
    unitKey: 'units.years',
  },
  {
    kind: 'currency',
    name: 'initial',
    param: 'initial',
    min: 0,
    max: 1e10,
    step: 500,
    advanced: true,
  },
  {
    kind: 'select',
    name: 'frequency',
    param: 'freq',
    options: FREQUENCIES,
    advanced: true,
  },
  {
    kind: 'percent',
    name: 'inflationPercent',
    param: 'inflation',
    min: 0,
    max: 100,
    step: 0.1,
    advanced: true,
  },
];

const schema = (t: Translate) =>
  z.object({
    initial: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    contribution: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    frequency: z.enum(FREQUENCIES),
    ratePercent: z
      .number({ message: t('errors.number') })
      .gt(-100, { message: t('errors.rateRange') })
      .max(1000, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: MAX_YEARS }) })
      .max(MAX_YEARS, { message: t('errors.yearsRange', { max: MAX_YEARS }) }),
    inflationPercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(100, { message: t('errors.rateRange') }),
  }) satisfies z.ZodType<DcaInput>;

export const dca: CalculatorDefinition<DcaInput, DcaResult> = {
  slug: 'dollar-cost-averaging',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeDca(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'finalValue',
      value: result.finalValue,
      format: 'moneyWhole',
      projected: true,
    },
    secondary: [
      {
        labelKey: 'totalContributions',
        value: result.totalContributions,
        format: 'moneyWhole',
      },
      {
        labelKey: 'gain',
        value: result.gain,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'realValue',
        value: result.realValue,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'annualisedReturn',
        value: result.annualisedReturnPercent,
        format: 'percentChange',
        projected: true,
      },
    ],
    table: {
      columnKeys: ['year', 'contributed', 'value', 'gain'],
      rows: result.schedule.map((row) => [
        { labelKey: 'year', value: row.year, format: 'plain' as const },
        {
          labelKey: 'contributed',
          value: row.contributed,
          format: 'moneyWhole' as const,
        },
        { labelKey: 'value', value: row.value, format: 'moneyWhole' as const },
        { labelKey: 'gain', value: row.gain, format: 'moneyWhole' as const },
      ]),
      previewRows: 5,
    },
  }),

  toChartSpec: (result) => ({
    kind: 'stackedArea',
    xLabelKey: 'chart.xAxis',
    x: result.schedule.map((row) => row.year),
    series: [
      {
        idKey: 'chart.contributions',
        values: result.schedule.map((r) => r.contributed),
      },
      {
        idKey: 'chart.gain',
        values: result.schedule.map((r) => Math.max(r.gain, 0)),
      },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'investing',
  messageKey: 'dca',
  disclaimer: 'investment',
  newsPhrases: [
    'investim mujor',
    'kursim i rregullt',
    'fond indeksi',
    'ETF',
    'monthly investing',
    'regular savings',
    'index fund',
    'etf',
    'dollar cost averaging',
  ],
  relatedSlugs: ['compound-interest', 'retirement', 'cagr'],
  faqCount: 3,
  embeddableIn: ['stocks', 'markets', 'economy'],
  order: 7,
};
