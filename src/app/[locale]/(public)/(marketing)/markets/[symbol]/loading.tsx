import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell>
      <div className="page-container flex items-center gap-2 py-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-20" />
      </div>
      <header className="page-container pt-6.5">
        <div className="border-ink flex flex-col gap-8 border-b-2 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3.5 flex flex-wrap items-center gap-3">
              <Skeleton className="border-line h-6 w-16 border" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="mb-3.5 h-11 w-full max-w-130" />
            <Skeleton className="h-11 w-3/5 max-w-105" />
          </div>
          <div className="shrink-0 lg:text-right">
            <Skeleton className="mb-2 h-10 w-40 lg:ml-auto" />
            <Skeleton className="h-4 w-32 lg:ml-auto" />
          </div>
        </div>
      </header>
      <div className="page-container flex flex-col gap-12 pt-8 pb-16 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="border-line bg-surface mb-8 rounded-sm border p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-12" />
                ))}
              </div>
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="border-line bg-surface mb-10 rounded-sm border">
            <dl className="divide-line grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="border-line-soft border-b px-6 py-5 sm:border-r lg:nth-[3n]:border-r-0"
                >
                  <Skeleton className="mb-2 h-3 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </dl>
          </div>
          <section className="mb-10">
            <Skeleton className="mb-3.5 h-7 w-64" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-4.5">
                <Skeleton className="mb-2 h-5 w-full max-w-[72ch]" />
                <Skeleton className="mb-2 h-5 w-full max-w-[72ch]" />
                <Skeleton className="h-5 w-3/4 max-w-[72ch]" />
              </div>
            ))}
            <div className="border-accent bg-surface-tint mt-6 rounded-r-sm border-l-2 p-5">
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </section>
          <section className="mb-10">
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="border-line-soft flex items-center gap-4 border-b py-2.5 last:border-b-0"
                >
                  <Skeleton className="h-3.5 w-40 shrink-0" />
                  <div className="bg-surface-tint relative h-1.5 flex-1 overflow-hidden rounded-full">
                    <Skeleton
                      className="h-full rounded-none"
                      style={{ width: `${65 - index * 7}%` }}
                    />
                  </div>
                  <Skeleton className="h-3.5 w-12 shrink-0" />
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-48" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-line border-t py-5 first:border-t-0"
              >
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="mb-2 h-6 w-4/5" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </section>
        </div>
        <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`border-line rounded-sm border p-5.5 sm:px-6 ${
                index === 3 ? 'bg-surface-muted' : ''
              }`}
            >
              <Skeleton className="mb-4 h-3 w-28" />
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-line-soft flex items-center justify-between border-b py-3 last:border-b-0"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3.5 w-14" />
                </div>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </MarketingLoadingShell>
  );
}
