import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="learn">
      <div className="page-container flex items-center gap-2 py-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="page-container flex flex-col gap-14 pt-7 pb-16 lg:flex-row">
        <nav className="hidden lg:sticky lg:top-7 lg:block lg:h-fit lg:w-61 lg:shrink-0">
          <Skeleton className="mb-4 h-3 w-28" />
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-4 ${index % 3 === 0 ? 'w-3/4' : 'w-full'}`}
              />
            ))}
          </div>
          <div className="border-line mt-6.5 border-t pt-5.5">
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-1 w-full rounded-full" />
          </div>
        </nav>
        <article className="min-w-0 flex-1 lg:max-w-180">
          <div className="mb-4 flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="size-1 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="mb-3 h-11 w-full" />
          <Skeleton className="mb-4.5 h-11 w-4/5" />
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-8 h-6 w-3/4" />
          <div className="border-accent bg-surface-tint mb-8.5 rounded-r-sm border-l-2 py-5 pr-5.5 pl-5.5">
            <Skeleton className="mb-2 h-3 w-32" />
            <Skeleton className="mb-1.5 h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <section key={sectionIndex} className="mb-10">
              <Skeleton className="mb-3.5 h-7 w-64" />
              {Array.from({ length: 3 }).map((_, paraIndex) => (
                <div key={paraIndex} className="mb-5">
                  <Skeleton className="mb-2 h-5 w-full" />
                  <Skeleton className="mb-2 h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ))}
              {sectionIndex === 0 ? (
                <div className="border-line bg-surface my-7.5 rounded-sm border p-7">
                  <Skeleton className="mb-4 h-4 w-40" />
                  <ol>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <li
                        key={index}
                        className="border-line-soft flex gap-4 border-b py-3.5 last:border-b-0"
                      >
                        <Skeleton className="h-4 w-4 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <Skeleton className="mb-1.5 h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </section>
          ))}
          <div className="border-line bg-surface-muted mb-8.5 rounded-sm border p-7">
            <Skeleton className="mb-4 h-4 w-32" />
            <dl className="grid gap-5.5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-1.5 h-4 w-24" />
                  <Skeleton className="h-3.5 w-full" />
                </div>
              ))}
            </dl>
          </div>
          <nav className="border-ink mt-8.5 flex flex-col gap-5 border-t-2 pt-7.5 sm:flex-row">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="border-line flex-1 rounded-sm border p-5"
              >
                <Skeleton className="mb-2 h-3 w-16" />
                <Skeleton className="mb-1.5 h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </nav>
        </article>
        <aside className="flex flex-col gap-6 lg:w-67 lg:shrink-0">
          {[false, false, true].map((tint, index) => (
            <div
              key={index}
              className={`border-line rounded-sm border p-5.5 sm:px-6 ${
                tint ? 'bg-surface-muted' : ''
              }`}
            >
              <Skeleton className="mb-4 h-3 w-28" />
              {Array.from({ length: index === 2 ? 2 : 4 }).map(
                (_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="border-line-soft flex items-center justify-between border-b py-3 last:border-b-0"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3.5 w-14" />
                  </div>
                ),
              )}
            </div>
          ))}
        </aside>
      </div>
    </MarketingLoadingShell>
  );
}
