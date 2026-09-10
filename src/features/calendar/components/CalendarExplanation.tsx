'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  fetchExplanationFresh,
  type CalendarExplanation as ApiExplanation,
} from '@/lib/api/calendar';

type Status = 'ready' | 'loading' | 'unavailable';

interface ExplanationState {
  status: Status;
  explanation: ApiExplanation | null;
}

const ExplanationContext = createContext<ExplanationState>({
  status: 'unavailable',
  explanation: null,
});

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 3000;

interface ProviderProps {
  slug: string;
  locale: string;
  initial: ApiExplanation | null;
  children: ReactNode;
}

export function CalendarExplanationProvider({
  slug,
  locale,
  initial,
  children,
}: ProviderProps) {
  const [state, setState] = useState<ExplanationState>(() => ({
    status: initial ? 'ready' : 'loading',
    explanation: initial,
  }));

  useEffect(() => {
    if (state.status !== 'loading') return;

    let cancelled = false;

    const attempt = async () => {
      for (let i = 0; i < MAX_ATTEMPTS && !cancelled; i += 1) {
        const explanation = await fetchExplanationFresh(slug, locale);
        if (cancelled) return;
        if (explanation) {
          setState({ status: 'ready', explanation });
          return;
        }
        await new Promise<void>((resolve) =>
          setTimeout(resolve, RETRY_DELAY_MS),
        );
      }
      if (!cancelled) {
        setState((previous) => ({ ...previous, status: 'unavailable' }));
      }
    };

    void attempt();

    return () => {
      cancelled = true;
    };
  }, [state.status, slug, locale]);

  return (
    <ExplanationContext.Provider value={state}>
      {children}
    </ExplanationContext.Provider>
  );
}

function useExplanation(): ExplanationState {
  return useContext(ExplanationContext);
}

function ShimmerBar({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`block animate-pulse bg-[#DCE5EF] ${className}`}
    />
  );
}

export function ExplainerSection({ heading }: { heading: string }) {
  const { status, explanation } = useExplanation();

  if (
    status === 'ready' &&
    explanation &&
    explanation.whyItMatters.length > 0
  ) {
    return (
      <section className="mb-8.5">
        <h2 className="text-ink mb-3.5 font-serif text-[27px] font-medium">
          {heading}
        </h2>
        {explanation.whyItMatters.map((paragraph, index) => (
          <p
            key={index}
            className="mb-4.5 text-[17.5px] leading-[1.68] text-[color:var(--ink-secondary)]"
          >
            {paragraph}
          </p>
        ))}
      </section>
    );
  }

  if (status === 'unavailable') return null;

  return (
    <section className="mb-8.5" aria-busy="true" aria-live="polite">
      <ShimmerBar className="mb-4 h-7 w-[38%] rounded" />
      <ShimmerBar className="mb-3 h-4.5 w-full rounded" />
      <ShimmerBar className="mb-3 h-4.5 w-[94%] rounded" />
      <ShimmerBar className="mb-3 h-4.5 w-[88%] rounded" />
      <ShimmerBar className="mb-3 h-4.5 w-[70%] rounded" />
    </section>
  );
}

export function HowToReadSection({
  heading,
  enabled = true,
}: {
  heading: string;
  enabled?: boolean;
}) {
  const { status, explanation } = useExplanation();

  if (!enabled) return null;

  if (status === 'ready' && explanation && explanation.howToRead.length > 0) {
    return (
      <section className="border-line bg-surface-muted mb-9 rounded-sm border p-7 sm:px-8">
        <h2 className="text-ink mb-5 font-serif text-2xl font-medium">
          {heading}
        </h2>
        <ol>
          {explanation.howToRead.map((step, index) => (
            <li
              key={step.scenario}
              className="border-line-strong flex gap-4.5 border-b py-4.5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden
                className="text-ink-ghost pt-1 font-mono text-xs"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-ink mb-1.5 text-[16.5px] font-medium">
                  {step.scenario}
                </h3>
                <p className="text-ink-muted max-w-[74ch] text-[15px] leading-relaxed">
                  {step.implication}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (status === 'unavailable') return null;

  return (
    <section
      className="border-line bg-surface-muted mb-9 rounded-sm border p-7 sm:px-8"
      aria-busy="true"
    >
      <ShimmerBar className="mb-6 h-7 w-[34%] rounded" />
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="border-line-strong flex gap-4.5 border-b py-4.5 first:pt-0 last:border-b-0 last:pb-0"
        >
          <ShimmerBar className="mt-1 h-3 w-5 rounded" />
          <div className="flex-1">
            <ShimmerBar className="mb-2 h-4.5 w-[62%] rounded" />
            <ShimmerBar className="mb-1.5 h-4 w-full rounded" />
            <ShimmerBar className="h-4 w-[82%] rounded" />
          </div>
        </div>
      ))}
    </section>
  );
}
