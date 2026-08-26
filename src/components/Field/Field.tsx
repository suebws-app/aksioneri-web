import type { ReactNode } from 'react';

/**
 * The accessibility contract for one form control, written once.
 *
 * A calculator is a form with a dozen inputs, and every one of them needs the
 * same four things wired correctly: a label tied to the control, an optional
 * hint tied through `aria-describedby`, an error that announces itself, and
 * `aria-invalid` on the control. Getting that right per-input by hand is how
 * half the inputs end up with an unlabelled control.
 *
 * So `Field` owns the ids and hands them back through a render prop. The
 * control it wraps stays whatever the caller needs — a native input, a select,
 * a segmented control — and cannot forget the wiring, because the ids only
 * exist inside the callback.
 *
 * Server component: it generates no ids of its own, the caller passes one.
 * Ids come from the field name rather than `useId()` deliberately — a
 * calculator's field names are already unique within the form, and a stable id
 * survives into the shareable URL's `#` anchors and into Playwright selectors.
 */

export interface FieldRenderProps {
  id: string;
  /** Pass to the control. Undefined when there is neither hint nor error. */
  describedBy: string | undefined;
  invalid: boolean;
}

export interface FieldProps {
  /** Unique within the form. Becomes the control's `id`. */
  name: string;
  label: string;
  /** Explains the unit or the assumption. Announced with the control. */
  hint?: string;
  /** Already translated. Its presence is what makes the field invalid. */
  error?: string;
  /** Rendered after the label, for a unit toggle or a "why" link. */
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

  // Both are named when both exist: a screen reader should read the unit and
  // then what went wrong, not one at the expense of the other.
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
