import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="calendar">
      <div className="page-container pt-8 pb-14">
        <div className="border-ink flex flex-col gap-8 border-b-2 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex gap-3">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="mb-3 h-11 w-3/4" />
            <Skeleton className="mb-1.5 h-5 w-full max-w-[64ch]" />
            <Skeleton className="h-5 w-2/3 max-w-[48ch]" />
          </div>
          <div className="shrink-0">
            <Skeleton className="mb-2 h-3.5 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px pt-px sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-surface px-6 py-5">
              <Skeleton className="mb-2.5 h-3 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
        <div className="pt-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-5">
              <Skeleton className="mb-1.5 h-4 w-full max-w-[680px]" />
              <Skeleton className="h-4 w-3/4 max-w-[520px]" />
            </div>
          ))}
        </div>
      </div>
    </MarketingLoadingShell>
  );
}
