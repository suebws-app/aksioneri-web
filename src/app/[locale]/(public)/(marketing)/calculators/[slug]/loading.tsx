import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="calculators">
      <div className="page-container flex items-center gap-2 py-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-40" />
      </div>
      <header className="page-container pt-6.5">
        <div className="border-ink border-b-2 pb-6">
          <Skeleton className="mb-3.5 h-11 w-full max-w-[20ch]" />
          <Skeleton className="mb-3.5 h-11 w-3/5 max-w-[20ch]" />
          <Skeleton className="mb-2 h-5 w-full max-w-[62ch]" />
          <Skeleton className="mb-2 h-5 w-full max-w-[62ch]" />
          <Skeleton className="h-5 w-2/3 max-w-[62ch]" />
        </div>
      </header>
      <div className="page-container pt-9">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-9 w-20" />
            </div>
            <div className="flex flex-col gap-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-2 h-3.5 w-28" />
                  <Skeleton className="border-line h-11 w-full border" />
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="border-line bg-surface rounded-sm border p-6">
              <Skeleton className="mb-2 h-3 w-32" />
              <Skeleton className="mb-6 h-10 w-2/3" />
              <div className="mb-6 flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-line-soft flex items-center justify-between border-b py-2.5 last:border-b-0"
                  >
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3.5 w-24" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="mt-3 h-3 w-56" />
          </section>
        </div>
      </div>
      <div className="page-container flex flex-col gap-12 pt-14 pb-16 lg:flex-row">
        <div className="min-w-0 flex-1 lg:max-w-180">
          <section>
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-40" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mt-4.5">
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </section>
          <section className="mt-10">
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="mt-4.5">
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </section>
          <section className="mt-10">
            <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
              <Skeleton className="h-6 w-16" />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="border-line-soft flex items-center justify-between border-b py-4"
              >
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="size-4 shrink-0" />
              </div>
            ))}
          </section>
        </div>
        <aside className="flex w-full flex-col gap-8 lg:max-w-[320px]">
          <div className="border-line rounded-sm border p-4">
            <Skeleton className="mb-2 h-3.5 w-full" />
            <Skeleton className="mb-2 h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div>
            <Skeleton className="mb-3 h-4 w-40" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-line rounded-sm border p-4">
                  <Skeleton className="mb-1.5 h-3 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </MarketingLoadingShell>
  );
}
