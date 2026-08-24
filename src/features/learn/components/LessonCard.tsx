import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Lesson } from '../learnTypes';

/**
 * A Learning Center card. The numeral is positional within the list it appears
 * in, so it is passed rather than stored — the same lesson is "01" on the
 * homepage and something else in the full index.
 */
interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const t = useTranslations('learn');

  return (
    <Link
      href={`/learn/${lesson.slug}`}
      className="border-line bg-surface hover:border-ink-faint block rounded-sm border p-6 transition-colors"
    >
      <div className="text-ink-ghost mb-8 font-mono text-xs">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-ink mb-2.5 font-serif text-[22px] font-medium">
        {lesson.title}
      </h3>
      <p className="text-ink-muted mb-4.5 text-[15px] leading-relaxed">
        {lesson.summary}
      </p>
      <div className="text-ink-faint text-[13px]">
        {t('meta', {
          minutes: lesson.readingMinutes,
          level: t(`levels.${lesson.level}`),
        })}
      </div>
    </Link>
  );
}
