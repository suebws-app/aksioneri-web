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
  article: Pick<NewsArticle, 'slug' | 'hasPage' | 'sourceUrl'>;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
  ariaHidden?: boolean;
}) {
  if (article.hasPage === false && article.sourceUrl) {
    return (
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={className}
        tabIndex={tabIndex}
        aria-hidden={ariaHidden}
      >
        {children}
      </a>
    );
  }

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
