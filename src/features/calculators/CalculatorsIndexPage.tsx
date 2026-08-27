import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils/cn';
import { CalculatorCard } from './components/CalculatorCard';
import { getCalculators } from './registry';
import { ALL_CATEGORIES, CATEGORY_PARAM } from './indexParams';
import type { CalculatorCategory } from './types';

/**
 * The calculators landing page.
 *
 * Filtering happens on the server, from the query string, and the filter
 * controls are plain links rather than buttons. That makes every filtered view
 * a real URL a reader can bookmark or an editor can link to from an article —
 * "see our borrowing calculators" — and it works with JavaScript off.
 *
 * There is no text search. Every calculator fits on one screen, so a search
 * box asked the reader to type more than it saved them — and the site-wide
 * search in the header already covers the case of arriving without knowing
 * where to look.
 *
 * Three sections the spec asks for are deliberately absent: "popular",
 * "trending with our readers", and "calculators related to today's news".
 *
 * The first two need usage counts that do not exist until analytics ships,
 * and the third needs the article matcher. A rail headed "most used" that is
 * really "whatever we listed first" is a claim the page cannot support — and
 * because the same cards then appear again in the full list directly below,
 * it also reads as duplicate calculators rather than as a recommendation.
 *
 * The `order` field still ranks the single grid, so the editorial judgement
 * about what matters most is preserved without asserting it is data.
 */

interface CalculatorsIndexPageProps {
  locale: Locale;
  category: CalculatorCategory | null;
}

export async function CalculatorsIndexPage({
  locale,
  category,
}: CalculatorsIndexPageProps) {
  const t = await getTranslations({ locale, namespace: 'calculators' });

  const all = getCalculators();

  const headings = new Map(
    all.map((calculator) => [
      calculator.slug,
      {
        heading: t(`${calculator.messageKey}.heading`),
        blurb: t(`${calculator.messageKey}.cardBlurb`),
      },
    ]),
  );

  const visible = category
    ? all.filter((calculator) => calculator.category === category)
    : all;

  // Only the categories that actually have a calculator: a filter that leads
  // to an empty page is a dead end a reader has to back out of.
  const populated = ALL_CATEGORIES.filter((candidate) =>
    all.some((calculator) => calculator.category === candidate),
  );

  const filterHref = (next: CalculatorCategory | null): string =>
    next ? `/calculators?${CATEGORY_PARAM}=${next}` : '/calculators';

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="calculators"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <header className="page-container pt-10">
          <div className="pb-5">
            <h1 className="text-ink mb-3.5 font-serif text-[46px] leading-[1.05] font-medium tracking-[-0.022em] text-balance">
              {t('heading')}
            </h1>
            <p className="text-ink-body max-w-[56ch] text-xl leading-[1.5] text-pretty">
              {t('heroBody')}
            </p>
          </div>
        </header>

        <div className="page-container pt-7">
          <nav aria-label={t('ui.filterLabel')} className="mb-8">
            <ul className="flex flex-wrap gap-2">
              {[null, ...populated].map((candidate) => {
                const active = candidate === category;

                return (
                  <li key={candidate ?? 'all'}>
                    <Link
                      href={filterHref(candidate)}
                      {...(active ? { 'aria-current': 'true' as const } : {})}
                      className={cn(
                        'inline-flex min-h-11 items-center rounded-sm border px-3.5 text-[14px]',
                        active
                          ? 'border-accent bg-accent font-medium text-white'
                          : 'border-line-strong bg-surface text-ink-muted hover:border-accent hover:text-accent',
                      )}
                    >
                      {candidate
                        ? t(`categories.${candidate}`)
                        : t('ui.allCategories')}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <section className="page-container pb-16">
          <SectionHeading title={t('ui.allCalculators')} size="md" />

          {visible.length === 0 ? (
            <p className="text-ink-body text-[15.5px] text-pretty">
              {t('ui.noResults')}
            </p>
          ) : (
            <ul className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((calculator) => (
                <li key={calculator.slug}>
                  <CalculatorCard
                    slug={calculator.slug}
                    heading={headings.get(calculator.slug)?.heading ?? ''}
                    blurb={headings.get(calculator.slug)?.blurb ?? ''}
                    category={t(`categories.${calculator.category}`)}
                    cta={t('ui.calculate')}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
