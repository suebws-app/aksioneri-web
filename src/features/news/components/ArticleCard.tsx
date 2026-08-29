import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { NewsArticle } from '../newsTypes';
import { ArticleMeta } from './ArticleMeta';
import { NewsImage } from './NewsImage';

interface ArticleCardProps {
  article: NewsArticle;
  variant: 'lead' | 'sidebar' | 'row' | 'list';
}

function ArticleLink({
  article,
  className,
  children,
  tabIndex,
  ariaHidden,
}: {
  article: NewsArticle;
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

function ArticleImage({
  article,
  className,
  sizes,
  priority,
}: {
  article: NewsArticle;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <ArticleLink article={article} tabIndex={-1} ariaHidden className="block">
      <NewsImage
        article={article}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    </ArticleLink>
  );
}

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const t = useTranslations('news');

  if (variant === 'lead') {
    return (
      <article>
        <ArticleImage
          article={article}
          className="mb-5.5 h-[300px] w-full"
          sizes="(max-width: 1024px) 100vw, 760px"
          priority
        />
        <ArticleMeta article={article} variant="full" className="mb-3.5" />
        <h2 className="text-ink mb-4 font-serif text-[41px] leading-[1.12] font-medium tracking-[-0.02em] text-balance">
          <ArticleLink article={article} className="hover:text-accent">
            {article.title}
          </ArticleLink>
        </h2>
        {article.summary ? (
          <p className="text-ink-body max-w-[62ch] text-[17px] leading-[1.62] text-pretty">
            {article.summary}
          </p>
        ) : null}
      </article>
    );
  }

  if (variant === 'sidebar') {
    return (
      <article className="flex gap-4">
        <div className="flex-1">
          <div className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {t(`categories.${article.category}`)}
          </div>
          <h3 className="text-ink mb-2.5 font-serif text-xl leading-[1.25] font-medium text-pretty">
            <ArticleLink article={article} className="hover:text-accent">
              {article.title}
            </ArticleLink>
          </h3>
          <ArticleMeta article={article} className="text-xs" />
        </div>
        <ArticleImage
          article={article}
          className="size-22 shrink-0"
          sizes="88px"
        />
      </article>
    );
  }

  if (variant === 'list') {
    return (
      <article className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <ArticleImage
          article={article}
          className="h-[130px] w-full shrink-0 sm:w-[196px]"
          sizes="(max-width: 640px) 100vw, 196px"
        />
        <div className="flex-1">
          <div className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {t(`categories.${article.category}`)}
          </div>
          <h3 className="text-ink mb-2.5 font-serif text-[25px] leading-[1.2] font-medium text-pretty">
            <ArticleLink article={article} className="hover:text-accent">
              {article.title}
            </ArticleLink>
          </h3>
          {article.summary ? (
            <p className="text-ink-muted mb-3 max-w-[72ch] text-[15.5px] leading-relaxed">
              {article.summary}
            </p>
          ) : null}
          <ArticleMeta article={article} className="text-[12.5px]" />
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 sm:flex-row sm:gap-5">
      <ArticleImage
        article={article}
        className="h-22 w-full shrink-0 sm:w-33"
        sizes="(max-width: 640px) 100vw, 132px"
      />
      <div className="flex-1">
        <h3 className="text-ink mb-2 font-serif text-[21px] leading-[1.24] font-medium">
          <ArticleLink article={article} className="hover:text-accent">
            {article.title}
          </ArticleLink>
        </h3>
        {article.summary ? (
          <p className="text-ink-muted mb-2.5 max-w-[68ch] text-[15px] leading-relaxed">
            {article.summary}
          </p>
        ) : null}
        <ArticleMeta article={article} variant="full" className="text-xs" />
      </div>
    </article>
  );
}
