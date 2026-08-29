import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import type { GlossaryLinker } from '../linkGlossaryTerms';

export function GlossaryText({
  text,
  linker,
}: {
  text: string;
  linker: GlossaryLinker;
}) {
  const parts = linker.linkParagraph(text);

  if (!parts) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) =>
        typeof part === 'string' ? (
          <Fragment key={`text-${String(index)}`}>{part}</Fragment>
        ) : (
          <Link
            key={`${part.term.slug}-${String(index)}`}
            href={`/learn/glossary#${part.term.slug}`}
            title={part.term.definition}
            className="decoration-ink-ghost hover:decoration-accent hover:text-accent underline decoration-dotted underline-offset-4"
          >
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}
