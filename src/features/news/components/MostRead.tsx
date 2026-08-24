import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { MostReadEntry } from '../newsData';

/** The numbered popularity rail in the news sidebar. */
export function MostRead({ entries }: { entries: MostReadEntry[] }) {
  const t = useTranslations('news');

  return (
    <section className="border-line bg-surface rounded-sm border p-6">
      <h2 className="text-ink mb-4.5 font-serif text-xl">{t('mostRead')}</h2>

      <ol>
        {entries.map((entry, index) => {
          const hours = Math.floor(entry.minutesAgo / 60);

          return (
            <li
              key={entry.id}
              className="border-line-soft flex gap-3.5 border-b py-4 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden
                className="text-ink-ghost font-mono text-[13px]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-ink mb-1.5 text-[15px] leading-snug">
                  <Link
                    href={`/news/${entry.slug}`}
                    className="hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </h3>
                <p className="text-ink-faint text-xs">
                  {t(`categories.${entry.category}`)} ·{' '}
                  {hours >= 1
                    ? t('hoursAgo', { hours })
                    : t('minutesAgo', { minutes: entry.minutesAgo })}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
