import { Card } from '@/components/Card';

export function Disclaimer({ text }: { text: string }) {
  return (
    <Card className="bg-surface-muted">
      <p className="text-ink-body text-[13.5px] leading-[1.65] text-pretty">
        {text}
      </p>
    </Card>
  );
}
