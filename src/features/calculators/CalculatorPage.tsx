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

interface CalculatorPageProps {
  calculator: AnyCalculator;
  locale: Locale;
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
