import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="news">
      <div className="page-container pt-10 pb-14">
        <div className="mx-auto max-w-[720px]">
          <Skeleton className="mb-4 h-3 w-32" />
          <Skeleton className="mb-2.5 h-10 w-full" />
          <Skeleton className="mb-6 h-10 w-4/5" />
          <div className="mb-8 flex gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-8 h-72 w-full" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="mb-5">
              <Skeleton className="mb-1.5 h-4 w-full" />
              <Skeleton className="mb-1.5 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </MarketingLoadingShell>
  );
}
