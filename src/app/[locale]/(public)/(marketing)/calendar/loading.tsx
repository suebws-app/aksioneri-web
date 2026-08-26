import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="calendar">
      <div className="page-container pt-10">
        <div className="mb-6.5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Skeleton className="mb-2 h-10 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-24" />
            ))}
          </div>
        </div>
        <div className="border-line flex flex-col gap-3 border-b pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-20" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-24" />
            ))}
          </div>
        </div>
      </div>
      <div className="page-container pt-5">
        <Skeleton className="mb-3.5 h-3.5 w-40" />
        <div className="border-line bg-surface overflow-hidden rounded-sm border">
          <div className="border-line grid grid-cols-[80px_100px_1fr_120px_repeat(3,110px)] items-center gap-4 border-b px-5 py-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-full" />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border-line-soft grid grid-cols-[80px_100px_1fr_120px_repeat(3,110px)] items-center gap-4 border-b px-5 py-4 last:border-b-0"
            >
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-5 w-16" />
              <div>
                <Skeleton className="mb-1.5 h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="page-container py-11">
        <div className="border-line bg-surface-muted rounded-sm border p-6.5">
          <Skeleton className="mb-4 h-6 w-56" />
          <div className="grid gap-8 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="mb-1.5 h-3.5 w-full" />
                <Skeleton className="mb-1.5 h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingLoadingShell>
  );
}
