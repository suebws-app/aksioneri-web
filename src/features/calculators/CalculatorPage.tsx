import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Disclosure } from '@/components/Disclosure';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { Locale } from '@/i18n/config';
import type { ComputeContext } from './engine';
import { getCalculatorContent } from './content';
import { getRelatedCalculators } from './registry';
import type { AnyCalculator } from './types';
import { CalculatorInteractive } from './components/CalculatorInteractive';
import { Disclaimer } from './components/Disclaimer';
import { RelatedCalculators } from './components/RelatedCalculators';

/**
 * One calculator's page, for every calculator.
 *
 * The order of the page is the order a reader needs it in: the tool first,
 * because that is what they came for, then the explanation, then the worked
 * example, then the questions, then the caveat. Explanation before the tool
 * would be a textbook; caveat before the tool would be a legal notice.
 *
 * Everything here is a server component except the island. That is what makes
 * a shared URL work with JavaScript off and gives a crawler real prose rather
 * than an empty container — the whole reason these pages can rank at all.
 */

interface CalculatorPageProps {
  calculator: AnyCalculator;
  locale: Locale;
  /** Decoded from the query string on the server. */
  initialInput: Record<string, unknown>;
  ctx: ComputeContext;
}

export async function CalculatorPage({
  calculator,
  locale,
  initialInput,
  ctx,
}: CalculatorPageProps) {
  const content = await getCalculatorContent(calculator, locale);
  const t = await getTranslations({ locale, namespace: 'calculators' });

  const related = getRelatedCalculators(calculator);

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="calculators"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <Breadcrumb
          label={t('breadcrumbLabel')}
          items={[
            { label: t('breadcrumbRoot'), href: '/calculators' },
            { label: content.heading },
          ]}
        />

        <header className="page-container pt-6.5">
          <div className="border-ink border-b-2 pb-6">
            <h1 className="text-ink mb-3.5 max-w-[20ch] font-serif text-[40px] leading-[1.1] font-medium tracking-[-0.022em] text-balance">
              {content.heading}
            </h1>
            <p className="text-ink-body max-w-[62ch] text-lg leading-[1.55] text-pretty">
              {content.intro}
            </p>
          </div>
        </header>

        <div className="page-container pt-9">
          {/* Only serialisable props cross this boundary — the definition
              itself holds functions, so the island resolves it by slug. */}
          <CalculatorInteractive
            slug={calculator.slug}
            initialInput={initialInput}
            ctx={ctx}
          />
        </div>

        <div className="page-container flex flex-col gap-12 pt-14 pb-16 lg:flex-row">
          <div className="min-w-0 flex-1 lg:max-w-[720px]">
            <section>
              <SectionHeading title={t('ui.howCalculated')} size="md" />
              {content.explanation.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-ink-secondary mb-4.5 text-[17.5px] leading-[1.7] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="mt-10">
              <SectionHeading title={t('ui.exampleHeading')} size="md" />
              <p className="text-ink-secondary text-[17.5px] leading-[1.7] text-pretty">
                {content.example}
              </p>
            </section>

            <section className="mt-10">
              <SectionHeading title={t('ui.faqHeading')} size="md" />
              {/* Native <details>, so every answer is in the HTML whether or
                  not JavaScript ran — which is what makes the FAQPage
                  structured data on this route an honest claim. */}
              {content.faq.map((entry, index) => (
                <Disclosure
                  key={entry.question}
                  summary={entry.question}
                  defaultOpen={index === 0}
                >
                  {entry.answer}
                </Disclosure>
              ))}
            </section>
          </div>

          <aside className="flex w-full flex-col gap-8 lg:max-w-[320px]">
            <Disclaimer text={content.disclaimer} />
            <RelatedCalculators calculators={related} locale={locale} />
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
