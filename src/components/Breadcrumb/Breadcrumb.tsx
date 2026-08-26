import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

/**
 * The trail above a detail page's headline.
 *
 * Four hand-written copies of this markup already exist — on the asset, the
 * article, the calendar event and the lesson — and they had already drifted:
 * each one reaches into a different translation namespace for the same
 * `breadcrumbLabel`, and none of them marks the current page. The calculators
 * would have made it five.
 *
 * Two things change in the process of extracting it. The last crumb now
 * carries `aria-current="page"`, which is what tells a screen reader the trail
 * has ended rather than leaving a reader to infer it from the missing link.
 * And the separators stay `aria-hidden`, because "slash" read between every
 * item is noise — the list structure already conveys the nesting.
 *
 * Pair it with `breadcrumbSchema` from `@/lib/seo/schemas`, which has been
 * exported and unused since it was written: the visible trail and the
 * structured data should describe the same path, and now they can.
 */

export interface BreadcrumbCrumb {
  label: string;
  /** Unlocalised path. Omit for a crumb that is not a link. */
  href?: string;
}

export interface BreadcrumbProps {
  /** Names the navigation landmark, e.g. "Rruga e faqes". */
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
            // Fragment rather than one `li` per crumb-plus-separator: the
            // separator is its own list item, as in the markup this replaces.
            // Wrapping both in an `li` with `display: contents` would have
            // been tidier and would have stripped the list semantics in
            // Safari and Chrome, which is the whole reason for the `ol`.
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
