import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="calculators">
      <header className="page-container pt-10">
        <div className="pb-5">
          <Skeleton className="mb-3.5 h-12 w-full max-w-[16ch]" />
          <Skeleton className="mb-3.5 h-12 w-4/5 max-w-[16ch]" />
          <Skeleton className="mb-2 h-6 w-full max-w-[56ch]" />
          <Skeleton className="h-6 w-3/4 max-w-[56ch]" />
        </div>
      </header>
      <div className="page-container pt-7">
        <nav className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <li key={index}>
                <Skeleton
                  className={`h-11 ${
                    index === 0 ? 'w-16' : index % 3 === 0 ? 'w-32' : 'w-24'
                  }`}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <section className="page-container pb-16">
        <div className="border-ink flex items-baseline justify-between border-b pb-3.5">
          <Skeleton className="h-6 w-40" />
        </div>
        <ul className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <li
              key={index}
              className="border-line bg-surface flex h-full flex-col rounded-sm border p-5"
            >
              <Skeleton className="mb-2.5 h-3 w-16" />
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="mb-4 h-5 w-3/4" />
              <div className="mb-4 flex-1">
                <Skeleton className="mb-1.5 h-3.5 w-full" />
                <Skeleton className="mb-1.5 h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
              <Skeleton className="h-3.5 w-24" />
            </li>
          ))}
        </ul>
      </section>
    </MarketingLoadingShell>
  );
}
