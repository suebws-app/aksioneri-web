import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';
import { SectionHeading } from '@/components/SectionHeading';
import type { AnyCalculator } from '../types';

/**
 * The other calculators worth a reader's time from here.
 *
 * The list comes from `relatedSlugs` on the definition and is resolved
 * through the registry, so a calculator that has not shipped yet is simply
 * absent rather than a dead link — the mistake `matchNews.ts` documents,
 * where nine lessons pointed at articles that never existed.
 */
export async function RelatedCalculators({
  calculators,
  locale,
}: {
  calculators: AnyCalculator[];
  locale: Locale;
}) {
  if (calculators.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'calculators' });

  return (
    <section>
      <SectionHeading title={t('ui.relatedCalculators')} size="md" />
      <ul className="grid gap-3 pt-5 sm:grid-cols-2">
        {calculators.map((calculator) => (
          <li key={calculator.slug}>
            <Link
              href={`/calculators/${calculator.slug}`}
              className="border-line bg-surface hover:border-accent group block rounded-sm border p-4"
            >
              <span className="text-ink group-hover:text-accent block font-serif text-[19px] font-medium">
                {t(`${calculator.messageKey}.heading`)}
              </span>
              <span className="text-ink-body mt-1 block text-[14px] text-pretty">
                {t(`${calculator.messageKey}.cardBlurb`)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
