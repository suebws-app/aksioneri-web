import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from '../newsTypes';

export function ArticleLink({
  article,
  className,
  children,
  tabIndex,
  ariaHidden,
}: {
  article: Pick<NewsArticle, 'slug'>;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
  ariaHidden?: boolean;
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={className}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
    >
      {children}
    </Link>
  );
}
