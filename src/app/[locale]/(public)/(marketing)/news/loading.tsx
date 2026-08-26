import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="news" ticker>
      <div className="page-container pt-10">
        <div className="mb-5.5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Skeleton className="mb-2 h-10 w-56" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24" />
          ))}
        </div>
      </div>
      <div className="page-container flex flex-col gap-11 pt-8.5 pb-11 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="border-ink border-b-2 pb-8">
            <LeadArticleSkeleton />
            <div className="border-line bg-surface-tint mt-5.5 rounded-sm border p-6">
              <Skeleton className="mb-2.5 h-3 w-28" />
              <Skeleton className="mb-1.5 h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="pt-6.5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border-line-soft flex gap-6 border-b py-6 last:border-b-0"
              >
                <Skeleton className="h-28 w-40 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="mb-2.5 h-3 w-20" />
                  <Skeleton className="mb-2 h-6 w-full" />
                  <Skeleton className="mb-3 h-6 w-4/5" />
                  <Skeleton className="mb-1.5 h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="flex flex-col gap-6 lg:w-84 lg:shrink-0">
          <MostReadCardSkeleton />
          <ComingUpCardSkeleton />
          <div className="border-line bg-surface-muted rounded-sm border p-6">
            <Skeleton className="mb-3 h-3 w-24" />
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-3.5 h-6 w-3/5" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="mb-4 h-3.5 w-4/5" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </aside>
      </div>
    </MarketingLoadingShell>
  );
}

function LeadArticleSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5 h-72 w-full sm:h-96" />
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="mb-2 h-10 w-full" />
      <Skeleton className="mb-4 h-10 w-4/5" />
      <Skeleton className="mb-1.5 h-4 w-full" />
      <Skeleton className="mb-1.5 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-3/4" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

function MostReadCardSkeleton() {
  return (
    <div className="border-line bg-surface rounded-sm border p-5.5 sm:px-6">
      <Skeleton className="mb-4 h-3 w-24" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border-line-soft flex gap-3 border-b py-3.5 last:border-b-0"
        >
          <Skeleton className="h-4 w-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <Skeleton className="mb-1.5 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ComingUpCardSkeleton() {
  return (
    <div className="border-line bg-surface rounded-sm border p-5.5 sm:px-6">
      <Skeleton className="mb-4 h-3 w-28" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="border-line-soft border-b py-3.5 last:border-b-0"
        >
          <Skeleton className="mb-1.5 h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
