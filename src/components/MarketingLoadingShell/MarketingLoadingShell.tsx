import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader, type SiteSection } from '@/components/SiteHeader';
import { Skeleton } from '@/components/Skeleton';

interface MarketingLoadingShellProps {
  active?: SiteSection;
  ticker?: boolean;
  children: ReactNode;
}

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
