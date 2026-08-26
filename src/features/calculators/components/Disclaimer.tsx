import { Card } from '@/components/Card';

/**
 * The caveat under a result.
 *
 * Rendered from the shared `disclaimers` subtree via a definition's
 * `DisclaimerKind`, so two investment calculators cannot end up warning about
 * the same risk in two different ways — and so no calculator can ship without
 * a caveat at all, because the kind is a required field on the contract.
 *
 * Not styled as a warning box. A red panel reads as an error and gets
 * dismissed as boilerplate; this is a quiet, permanent note in the same voice
 * as the rest of the page, which is how a serious publication prints one.
 */
export function Disclaimer({ text }: { text: string }) {
  return (
    <Card className="bg-surface-muted">
      <p className="text-ink-body text-[13.5px] leading-[1.65] text-pretty">
        {text}
      </p>
    </Card>
  );
}
