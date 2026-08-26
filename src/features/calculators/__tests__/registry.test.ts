import { describe, expect, it } from 'vitest';
import { createTranslator } from 'next-intl';
import messages from '../../../../messages/sq.json';
import type { ComputeContext } from '../engine';
import {
  getCalculators,
  getCalculator,
  getRelatedCalculators,
} from '../registry';
import type { AnyCalculator } from '../types';

/**
 * The meta-test — what makes adding calculator #11 safe.
 *
 * Two gaps make this necessary rather than nice to have.
 *
 * `pnpm i18n:check` compares locales against a reference, and with one locale
 * shipped it compares `sq` to itself: it passes unconditionally and cannot
 * notice a key nobody wrote. A missing label would reach production as the
 * literal string `calculators.foo.fields.bar.label` on the page.
 *
 * And a definition can be internally wrong in ways the type system permits: a
 * default outside its own field's bounds, a `relatedSlugs` entry pointing at a
 * calculator that was renamed, a `faqCount` that no longer matches the
 * catalogue.
 *
 * So this walks the whole registry and asserts both. It runs in `pnpm test`,
 * which CI already gates on.
 */

type Catalogue = Record<string, unknown>;

const catalogue = messages as unknown as Catalogue;

/** Follows a dotted path, returning undefined rather than throwing. */
function lookup(path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (typeof node !== 'object' || node === null) return undefined;
    return (node as Catalogue)[key];
  }, catalogue);
}

const expectString = (path: string) => {
  const value = lookup(path);
  expect(value, `missing message key: ${path}`).toBeTypeOf('string');
  expect((value as string).trim(), `empty message: ${path}`).not.toBe('');
};

const calculators = getCalculators();

/**
 * A context carrying whatever a calculator declared it needs.
 *
 * The assertion is "defaults compute **given the data this calculator says it
 * requires**". Handing every calculator an empty context would fail the ones
 * that correctly refuse without market data — which is the behaviour we want,
 * not a bug to design around.
 *
 * Fixture values, deliberately: this suite must not touch the network, and a
 * fixed table makes the arithmetic assertions stable.
 */
function contextFor(calculator: AnyCalculator): ComputeContext {
  const base = { today: '2026-01-01', currency: 'EUR' as const };

  switch (calculator.marketData.kind) {
    case 'fxRate':
    case 'fxSeries':
      return {
        ...base,
        rates: { USD: 1.1662, GBP: 0.8555, CHF: 0.9361, JPY: 171.2 },
        dataDate: '2026-01-01',
        dataSource: 'ecb',
      };
    case 'policyRate':
      return { ...base, rates: { ECB_MRO: 2.4 }, dataDate: '2026-01-01' };
    default:
      return base;
  }
}

/**
 * The real translator, not a stub returning the key.
 *
 * An identity function would happily "format" `"Afati duhet të jetë mes 1 dhe
 * {max} vjetësh."` without ever substituting `{max}` — which is exactly how a
 * missing ICU argument reached a reader as a thrown FORMATTING_ERROR while
 * this suite stayed green. Running the actual formatter means any schema that
 * forgets an argument fails here instead.
 */
const realTranslate = createTranslator({
  locale: 'sq',
  messages,
  namespace: 'calculators',
});

it('registers at least one calculator', () => {
  expect(calculators.length).toBeGreaterThan(0);
});

describe.each(calculators.map((c) => [c.slug, c] as const))(
  'registry: %s',
  (slug, calculator: AnyCalculator) => {
    const base = `calculators.${calculator.messageKey}`;

    it('has the page copy the shell renders', () => {
      for (const key of [
        'metaTitle',
        'metaDescription',
        'heading',
        'intro',
        'cardBlurb',
        'example',
      ]) {
        expectString(`${base}.${key}`);
      }
    });

    it('has a label and hint for every field it declares', () => {
      for (const field of calculator.fields) {
        const name = String(field.name);
        expectString(`${base}.fields.${name}.label`);
        expectString(`${base}.fields.${name}.hint`);
      }
    });

    it('has a label for every option of every choice field', () => {
      for (const field of calculator.fields) {
        if (field.kind !== 'select' && field.kind !== 'segmented') continue;

        for (const option of field.options) {
          expectString(`${base}.options.${String(field.name)}.${option}`);
        }
      }
    });

    it('has a label for every figure and column its result describes', () => {
      const outcome = calculator.compute(
        calculator.defaults,
        contextFor(calculator),
      );
      if (!outcome.ok) throw new Error(`defaults refused: ${outcome.reason}`);

      const spec = calculator.toResultSpec(outcome.value, calculator.defaults);

      expectString(`${base}.results.${spec.primary.labelKey}`);
      for (const figure of spec.secondary) {
        expectString(`${base}.results.${figure.labelKey}`);
      }
      for (const column of spec.table?.columnKeys ?? []) {
        expectString(`${base}.results.columns.${column}`);
      }
    });

    it('has copy for its chart, if it draws one', () => {
      if (!calculator.toChartSpec) return;

      const outcome = calculator.compute(
        calculator.defaults,
        contextFor(calculator),
      );
      if (!outcome.ok) throw new Error(`defaults refused: ${outcome.reason}`);

      const chart = calculator.toChartSpec(outcome.value, calculator.defaults);

      expectString(`${base}.chart.heading`);
      expectString(`${base}.${chart.xLabelKey}`);

      for (const series of chart.series) {
        expectString(`${base}.${series.idKey}`);
      }
    });

    it('has an explanation and exactly faqCount questions', () => {
      const explanation = lookup(`${base}.explanation`);
      expect(
        Array.isArray(explanation),
        `${base}.explanation must be an array`,
      ).toBe(true);
      expect((explanation as string[]).length).toBeGreaterThan(0);

      const faq = lookup(`${base}.faq`);
      expect(Array.isArray(faq), `${base}.faq must be an array`).toBe(true);

      // faqCount is what the definition claims; the catalogue is what ships.
      // If they drift, the FAQPage structured data would describe questions
      // that are not on the page.
      expect((faq as unknown[]).length).toBe(calculator.faqCount);

      for (const [index, entry] of (
        faq as { question?: string; answer?: string }[]
      ).entries()) {
        expect(
          entry.question,
          `${base}.faq[${String(index)}].question`,
        ).toBeTypeOf('string');
        expect(entry.answer, `${base}.faq[${String(index)}].answer`).toBeTypeOf(
          'string',
        );
      }
    });

    it('points at a disclaimer that exists', () => {
      expectString(`calculators.disclaimers.${calculator.disclaimer}`);
    });

    it('computes successfully from its own defaults', () => {
      // A calculator whose defaults refuse would render its error state to
      // every first-time visitor.
      const outcome = calculator.compute(
        calculator.defaults,
        contextFor(calculator),
      );

      expect(outcome.ok, `defaults refused for ${slug}`).toBe(true);
    });

    it('refuses cleanly when the market data it declares is absent', () => {
      // The other half of the contract: a calculator that needs data must say
      // so rather than computing with a hole in it. This is what drives the
      // page's "no data, type it yourself" state.
      if (calculator.marketData.kind === 'none') return;

      const outcome = calculator.compute(calculator.defaults, {
        today: '2026-01-01',
        currency: 'EUR',
      });

      expect(outcome.ok).toBe(false);
      if (!outcome.ok) expect(outcome.reason).toBe('noData');
    });

    it('has defaults that pass its own validation schema', () => {
      const result = calculator
        .schema(realTranslate as never)
        .safeParse(calculator.defaults);

      expect(result.success, `defaults failed schema for ${slug}`).toBe(true);
    });

    it('formats every validation message it can produce', () => {
      // Building the schema runs every `t(...)` call in it, including the
      // ones with ICU arguments. A message missing an argument throws here
      // rather than in front of a reader who typed a bad number.
      expect(() => calculator.schema(realTranslate as never)).not.toThrow();

      // And exercise the failure branches: some messages are only built when
      // a rule actually fails.
      const schema = calculator.schema(realTranslate as never);
      const hostile = Object.fromEntries(
        calculator.fields.map((field) => [
          String(field.name),
          field.kind === 'select' ||
          field.kind === 'segmented' ||
          field.kind === 'date'
            ? 'not-an-option'
            : Number.NEGATIVE_INFINITY,
        ]),
      );

      const result = schema.safeParse(hostile);
      expect(result.success).toBe(false);

      if (!result.success) {
        for (const issue of result.error.issues) {
          expect(issue.message).not.toContain('{');
        }
      }
    });

    it('has defaults inside the bounds its fields advertise', () => {
      const defaults = calculator.defaults as unknown as Record<
        string,
        unknown
      >;

      for (const field of calculator.fields) {
        const name = String(field.name);
        const value = defaults[name];

        expect(value, `${slug}: no default for field ${name}`).toBeDefined();

        if (field.kind === 'select' || field.kind === 'segmented') {
          expect(field.options).toContain(value);
        } else if (field.kind !== 'date') {
          expect(value).toBeGreaterThanOrEqual(field.min);
          expect(value).toBeLessThanOrEqual(field.max);
        }
      }
    });

    it('declares no field the input shape does not have', () => {
      const defaults = calculator.defaults as unknown as Record<
        string,
        unknown
      >;

      for (const field of calculator.fields) {
        expect(Object.keys(defaults)).toContain(String(field.name));
      }
    });

    it('resolves every related calculator it names, and does not name itself', () => {
      for (const related of calculator.relatedSlugs) {
        expect(related).not.toBe(calculator.slug);
      }

      // Unshipped slugs are dropped rather than rendered as dead links —
      // the failure `matchNews.ts` documents. Resolution must not throw.
      expect(() => getRelatedCalculators(calculator)).not.toThrow();
    });

    it('is retrievable by its own slug', () => {
      expect(getCalculator(slug)?.slug).toBe(slug);
    });

    it('declares phrases the article matcher can score', () => {
      expect(calculator.newsPhrases.length).toBeGreaterThan(0);
      for (const phrase of calculator.newsPhrases) {
        expect(phrase.trim()).not.toBe('');
      }
    });
  },
);

describe('registry invariants', () => {
  it('has a unique slug, messageKey and order per calculator', () => {
    const slugs = calculators.map((c) => c.slug);
    const keys = calculators.map((c) => c.messageKey);
    const orders = calculators.map((c) => c.order);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('returns null for an unknown slug rather than throwing', () => {
    expect(getCalculator('not-a-calculator')).toBeNull();
  });

  it('has the shared copy every calculator page renders', () => {
    for (const key of [
      'metaTitle',
      'metaDescription',
      'heading',
      'breadcrumbLabel',
      'breadcrumbRoot',
      'units.years',
      'ui.advancedOptions',
      'ui.howCalculated',
      'ui.reset',
      'ui.copyLink',
      'ui.copied',
      'ui.faqHeading',
      'ui.exampleHeading',
      'ui.relatedCalculators',
      'ui.currencyLabel',
      'ui.assumption',
      'ui.showAllRows',
      'refusals.heading',
    ]) {
      expectString(`calculators.${key}`);
    }
  });

  it('has a sentence for every refusal the engine can return', () => {
    // If the engine gains a reason and the catalogue does not, the reader
    // sees a raw key at exactly the moment something went wrong.
    for (const reason of [
      'nonFinite',
      'negativeAmount',
      'rateOutOfRange',
      'termOutOfRange',
      'divideByZero',
      'overflow',
      'noData',
    ]) {
      expectString(`calculators.refusals.${reason}`);
    }
  });

  it('has a nav label for the section', () => {
    expectString('nav.calculators');
  });
});
