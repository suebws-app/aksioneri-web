import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

const GROUP_ROW_COUNTS = [8, 5, 5, 4, 6];

export default function Loading() {
  return (
    <MarketingLoadingShell ticker>
      <div className="page-container pt-10">
        <div className="mb-8">
          <Skeleton className="mb-2 h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
      <div className="page-container flex flex-col gap-10 pb-11">
        {GROUP_ROW_COUNTS.map((rows, groupIndex) => (
          <section key={groupIndex}>
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="border-line bg-surface mt-5 rounded-sm border">
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-line-soft flex items-center justify-between border-b px-5 py-3.5 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-3.5 w-40" />
                  </div>
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-3.5 w-14" />
                    <Skeleton className="h-3.5 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </MarketingLoadingShell>
  );
}
