import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="calendar">
      <div className="page-container flex items-center gap-2 py-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-40" />
      </div>
      <header className="page-container pt-6.5">
        <div className="border-ink flex flex-col gap-8 border-b-2 pb-5.5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3.5 flex flex-wrap items-center gap-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="mb-3 h-11 w-full max-w-150" />
            <Skeleton className="mb-3 h-11 w-3/4 max-w-125" />
            <Skeleton className="mb-1.5 h-5 w-full max-w-[64ch]" />
            <Skeleton className="h-5 w-4/5 max-w-[64ch]" />
          </div>
          <div className="shrink-0 lg:text-right">
            <Skeleton className="mb-1.5 h-3 w-24 lg:ml-auto" />
            <Skeleton className="mb-1.5 h-8 w-32 lg:ml-auto" />
            <Skeleton className="h-3 w-20 lg:ml-auto" />
          </div>
        </div>
      </header>
      <div className="page-container">
        <div className="border-line bg-surface relative overflow-x-auto border-b">
          <dl className="grid min-w-180 grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="border-line-soft border-r px-6 py-5 last:border-r-0"
              >
                <Skeleton className="mb-2.5 h-3 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="page-container flex flex-col gap-12 pt-10 pb-16 lg:flex-row">
        <div className="min-w-0 flex-1 lg:max-w-195">
          <section className="mb-9">
            <Skeleton className="mb-3.5 h-7 w-56" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </section>
          <div className="border-line bg-surface mb-9 rounded-sm border">
            <div className="border-line border-b p-6.5">
              <Skeleton className="mb-2 h-4 w-40" />
              <Skeleton className="h-3.5 w-56" />
            </div>
            <div className="divide-line grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="p-6.5">
                  <Skeleton className="mb-3 h-4 w-24" />
                  <Skeleton className="mb-2 h-3.5 w-full" />
                  <Skeleton className="mb-2 h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-2/3" />
                </div>
              ))}
            </div>
            <div className="bg-surface-tint border-line border-t p-5">
              <Skeleton className="h-3.5 w-full max-w-100" />
            </div>
          </div>
          <section className="mb-9">
            <Skeleton className="mb-2 h-6 w-40" />
            <Skeleton className="mb-4 h-3.5 w-2/3" />
            <div className="border-line bg-surface mb-4 flex h-55 items-end gap-3 rounded-sm border p-6.5">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex-1"
                  style={{ height: `${30 + ((index * 13) % 60)}%` }}
                />
              ))}
            </div>
            <div className="border-line bg-surface w-full min-w-130 overflow-x-auto rounded-sm border">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="border-line-soft grid grid-cols-4 gap-4 border-b px-5 py-3 last:border-b-0"
                >
                  {Array.from({ length: 4 }).map((_, cellIndex) => (
                    <Skeleton key={cellIndex} className="h-3.5 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </section>
          <div className="border-line bg-surface-muted rounded-sm border p-7">
            <Skeleton className="mb-4 h-5 w-40" />
            <ol>
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="border-line-soft flex gap-4.5 border-b py-4.5 last:border-b-0"
                >
                  <Skeleton className="h-5 w-5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="mb-1.5 h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`border-line rounded-sm border p-5.5 sm:px-6 ${
                index === 3
                  ? 'bg-surface-muted'
                  : index === 0
                    ? 'bg-surface'
                    : ''
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
