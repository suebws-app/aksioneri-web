import { MarketingLoadingShell } from '@/components/MarketingLoadingShell';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <MarketingLoadingShell active="news">
      <div className="page-container flex items-center gap-2 py-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-2" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="page-container flex flex-col gap-14 pt-7 lg:flex-row">
        <article className="min-w-0 flex-1 lg:max-w-190">
          <Skeleton className="mb-4.5 h-12 w-full" />
          <Skeleton className="mb-4.5 h-12 w-4/5" />
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-6.5 h-6 w-3/4" />
          <div className="border-line mb-7.5 flex items-center gap-3.5 border-y py-4.5">
            <Skeleton className="size-9.5 rounded-full" />
            <div className="flex-1">
              <Skeleton className="mb-1.5 h-3.5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="mb-3 h-100 w-full" />
          <Skeleton className="mb-8.5 h-3 w-3/5" />
          <div className="border-line bg-surface-tint mb-8.5 rounded-sm border p-6.5">
            <Skeleton className="mb-2.5 h-3 w-28" />
            <Skeleton className="mb-1.5 h-4 w-full" />
            <Skeleton className="mb-1.5 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="mb-5">
              <Skeleton className="mb-1.5 h-5 w-full" />
              <Skeleton className="mb-1.5 h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          ))}
          <div className="border-line bg-surface my-7.5 rounded-sm border p-6.5">
            <Skeleton className="mb-5 h-3 w-32" />
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-2 h-6 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </dl>
          </div>
          <Skeleton className="mt-9 mb-3.5 h-7 w-64" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-5">
              <Skeleton className="mb-1.5 h-5 w-full" />
              <Skeleton className="mb-1.5 h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}
          <div className="border-line bg-surface-muted mt-9 rounded-sm border p-6.5">
            <Skeleton className="mb-5 h-3 w-24" />
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-1.5 h-3.5 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </dl>
          </div>
          <div className="border-ink mt-9 border-t-2 pt-7.5">
            <Skeleton className="mb-5.5 h-6 w-40" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="mb-3 h-33 w-full" />
                  <Skeleton className="mb-2 h-3 w-20" />
                  <Skeleton className="mb-1.5 h-4 w-full" />
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </article>
        <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
          <SidebarCardSkeleton eyebrowWidth="w-32" rows={4} />
          <SidebarCardSkeleton eyebrowWidth="w-24" rows={2} tint />
          <SidebarCardSkeleton eyebrowWidth="w-24" rows={3} />
          <div className="border-line bg-surface-muted rounded-sm border p-5.5 sm:px-6">
            <Skeleton className="mb-3 h-3 w-24" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-3/5" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="mb-4 h-3.5 w-4/5" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </aside>
      </div>
    </MarketingLoadingShell>
  );
}

function SidebarCardSkeleton({
  eyebrowWidth,
  rows,
  tint = false,
}: {
  eyebrowWidth: string;
  rows: number;
  tint?: boolean;
}) {
  return (
    <div
      className={`border-line rounded-sm border p-5.5 sm:px-6 ${
        tint ? 'bg-surface' : ''
      }`}
    >
      <Skeleton className={`mb-4 h-3 ${eyebrowWidth}`} />
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="border-line-soft flex items-center justify-between border-b py-3 last:border-b-0"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3.5 w-14" />
        </div>
      ))}
    </div>
  );
}
