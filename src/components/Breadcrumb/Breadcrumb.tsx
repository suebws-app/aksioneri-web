import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  label: string;
  items: readonly BreadcrumbCrumb[];
  className?: string;
}

export function Breadcrumb({ label, items, className }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={cn('page-container pt-6.5', className)}>
      <ol className="text-ink-faint flex flex-wrap items-center gap-2.5 text-[13px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${String(index)}`}>
              {index > 0 ? <li aria-hidden>/</li> : null}

              <li>
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-accent' : undefined}
                    {...(isLast ? { 'aria-current': 'page' as const } : {})}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
