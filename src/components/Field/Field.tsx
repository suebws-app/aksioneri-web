import type { ReactNode } from 'react';

export interface FieldRenderProps {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
}

export interface FieldProps {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  action?: ReactNode;
  children: (props: FieldRenderProps) => ReactNode;
}

export function Field({
  name,
  label,
  hint,
  error,
  action,
  children,
}: FieldProps) {
  const id = `field-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const invalid = Boolean(error);

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-ink-body font-sans text-[14px] font-medium"
        >
          {label}
        </label>
        {action}
      </div>

      {children({ id, describedBy, invalid })}

      {hint ? (
        <p id={hintId} className="text-ink-faint text-[12.5px] text-pretty">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-negative text-[12.5px] text-pretty"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
