import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader, type SiteSection } from '@/components/SiteHeader';
import { Skeleton } from '@/components/Skeleton';

interface MarketingLoadingShellProps {
  active?: SiteSection;
  /**
   * Renders a placeholder for the `<MarketTicker />` strip that sits
   * under the header on the pages that actually mount it — the home
   * daily briefing, the news index and the markets index. Off elsewhere
   * so we do not paint a ticker on pages that never had one.
   */
  ticker?: boolean;
  children: ReactNode;
}

/**
 * The marketing pages own their outer chrome (SiteHeader, optional
 * MarketTicker, SiteFooter) rather than sharing a route-group layout, so a
 * `loading.tsx` that only returned skeleton bands would flash to a chromeless
 * page during navigation. This wrapper keeps the same shell the real page
 * renders — a real SiteHeader and SiteFooter (both static, no data), plus a
 * placeholder ticker strip only where the real page mounts one, so we do not
 * re-fetch quotes just to throw them away.
 */
export function MarketingLoadingShell({
  active,
  ticker = false,
  children,
}: MarketingLoadingShellProps) {
  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active={active} />
      {ticker ? <TickerSkeleton /> : null}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

/**
 * Six 212px cells with the same padding, label and price row as
 * `MarketTickerLive` — keeps the strip's height identical so the header
 * does not jump when the real ticker mounts.
 */
function TickerSkeleton() {
  return (
    <div className="border-line bg-surface border-b">
      <div className="page-container overflow-hidden">
        <div className="flex">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border-line-soft w-53 shrink-0 border-r px-5.5 py-3.5"
            >
              <Skeleton className="mb-1.5 h-3 w-14" />
              <div className="flex items-baseline gap-2.5">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3.5 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
