import { Skeleton } from '@/components/Skeleton';

export function SearchResultsSkeleton() {
  return (
    <>
      <Skeleton className="mb-8 h-3 w-40" />
      <div className="flex flex-col gap-10">
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <section key={groupIndex}>
            <Skeleton className="mb-4 h-3 w-28" />
            <ul className="border-line bg-surface divide-line-soft divide-y rounded-sm border">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <li key={rowIndex} className="px-5 py-4">
                  <Skeleton className="mb-2 h-4 w-2/3" />
                  <Skeleton className="h-3.5 w-1/2" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
