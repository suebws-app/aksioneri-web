import { Skeleton } from '@/components/Skeleton';

const STATS_COUNT = 8;

export default function Loading() {
  return (
    <div className="page-container flex flex-col gap-10 pt-8 pb-12">
      <div className="border-line bg-surface rounded-md border p-6">
        <Skeleton className="mb-3 h-4 w-32" />
        <Skeleton className="mb-2 h-8 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>

      <section>
        <div className="border-ink flex items-baseline justify-between border-b-2 pb-3.5">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="border-line bg-surface rounded-b-md border border-t-0 p-6.5">
          <Skeleton className="h-[280px] w-full" />
        </div>
      </section>

      <section>
        <div className="border-ink flex items-baseline justify-between border-b-2 pb-3.5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </div>
        <div className="border-line bg-surface grid grid-cols-2 rounded-b-md border border-t-0 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: STATS_COUNT }).map((_, index) => (
            <div
              key={index}
              className="border-line-soft border-r border-b px-6 py-5 last:border-b-0"
            >
              <Skeleton className="mb-2 h-3 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
