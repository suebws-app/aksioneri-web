import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STEPS = ['surprise', 'impact', 'rates'] as const;

export function ReadingPrimer() {
  const t = useTranslations('calendar.primer');

  return (
    <section className="border-line bg-surface-muted rounded-sm border p-8 sm:p-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-ink mb-1.5 font-serif text-[25px] font-medium">
            {t('heading')}
          </h2>
          <p className="text-ink-muted text-[15px]">{t('subheading')}</p>
        </div>
        <Link
          href="/learn"
          className="text-accent text-[13px] whitespace-nowrap hover:underline"
        >
          {t('learnMore')}
        </Link>
      </div>

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        {STEPS.map((step, index) => (
          <li
            key={step}
            className={
              index === 0
                ? 'lg:pr-8'
                : 'lg:border-line-strong lg:border-l lg:px-8 lg:last:pr-0'
            }
          >
            <div className="text-ink-ghost mb-3 font-mono text-xs">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-ink mb-2 text-[17px] font-medium">
              {t(`${step}.title`)}
            </h3>
            <p className="text-ink-muted text-[15px] leading-relaxed">
              {t(`${step}.body`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
