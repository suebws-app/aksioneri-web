import { useTranslations } from 'next-intl';
import { formatMinutesAgo } from '@/lib/format/relativeTime';
import { cn } from '@/lib/utils/cn';
import type { NewsArticle } from '../newsTypes';

/**
 * The dot-separated meta line: age, reading time and an optional ticker.
 *
 * Ages are relative and pre-computed in the data ("32 minutes ago"), so the
 * page stays statically renderable. A live clock would force it dynamic for a
 * detail no reader checks to the minute.
 */
interface ArticleMetaProps {
  article: NewsArticle;
  /** `full` adds the category label ahead of the age. */
  variant?: 'full' | 'compact';
  className?: string;
}

function Dot() {
  return <span aria-hidden className="size-[3px] rounded-full bg-[#c8c3b8]" />;
}

export function ArticleMeta({
  article,
  variant = 'compact',
  className,
}: ArticleMetaProps) {
  const t = useTranslations('news');

  const age = formatMinutesAgo(article.minutesAgo, t);

  return (
    <div
      className={cn(
        'text-ink-faint flex flex-wrap items-center gap-2.5 text-[13px]',
        className,
      )}
    >
      {variant === 'full' ? (
        <>
          <span className="text-accent text-[11px] font-semibold tracking-[0.12em] uppercase">
            {t(`categories.${article.category}`)}
          </span>
          <Dot />
        </>
      ) : null}

      <span>{age}</span>
      <Dot />
      <span>{t('readingTime', { minutes: article.readingMinutes })}</span>

      {article.ticker ? (
        <>
          <Dot />
          <span
            className={cn(
              'font-mono',
              article.ticker.changePercent < 0
                ? 'text-negative'
                : 'text-positive',
            )}
          >
            {article.ticker.symbol}{' '}
            {article.ticker.changePercent < 0 ? '−' : '+'}
            {Math.abs(article.ticker.changePercent).toFixed(1)}%
          </span>
        </>
      ) : null}
    </div>
  );
}
