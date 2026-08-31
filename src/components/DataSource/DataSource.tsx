import { cn } from '@/lib/utils/cn';

export interface DataSourceProps {
  source: string;
  updatedAt?: string | null;
  updatedLabel?: string;
  className?: string;
}

export function DataSource({
  source,
  updatedAt,
  updatedLabel,
  className,
}: DataSourceProps) {
  return (
    <p
      className={cn(
        'text-ink-faint text-[11.5px] tracking-[0.04em]',
        className,
      )}
    >
      <span>{source}</span>
      {updatedAt ? (
        <>
          <span aria-hidden> · </span>
          <span>
            {updatedLabel ? `${updatedLabel} ` : ''}
            <time dateTime={updatedAt}>{formatUpdatedAt(updatedAt)}</time>
          </span>
        </>
      ) : null}
    </p>
  );
}

function formatUpdatedAt(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch {
    return iso;
  }
}
