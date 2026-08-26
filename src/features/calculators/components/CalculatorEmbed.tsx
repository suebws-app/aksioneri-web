import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/Card';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';
import { getCalculator } from '../registry';

/**
 * The calculator card that appears inside an article.
 *
 * A link into the full calculator rather than the working widget inline, and
 * that is the point rather than a shortcut. An article is being read; a
 * calculator is being used. Dropping a live form with eight fields into
 * paragraph four interrupts the reading without serving the calculating, and
 * it would ship the whole engine to every article page whether or not anyone
 * touched it.
 *
 * A server component: no state, no hydration, and it costs an article page
 * nothing in JavaScript.
 */
export async function CalculatorEmbed({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const calculator = getCalculator(slug);
  if (!calculator) return null;

  const t = await getTranslations({ locale, namespace: 'calculators' });

  return (
    <Card className="bg-surface-tint my-8">
      <p className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {t('ui.embedKicker')}
      </p>

      <h3 className="text-ink mb-2 font-serif text-[23px] leading-tight font-medium text-balance">
        {t(`${calculator.messageKey}.heading`)}
      </h3>

      <p className="text-ink-body mb-4 text-[15px] leading-[1.6] text-pretty">
        {t(`${calculator.messageKey}.cardBlurb`)}
      </p>

      <Link
        href={`/calculators/${calculator.slug}`}
        className="border-accent bg-accent inline-flex min-h-11 items-center gap-1.5 rounded-sm border px-5 text-[15px] font-medium text-white"
      >
        {t('ui.embedCta')}
        <svg aria-hidden viewBox="0 0 12 10" width="12" height="10" fill="none">
          <path
            d="M7 1 11 5 7 9M11 5H1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </Card>
  );
}
