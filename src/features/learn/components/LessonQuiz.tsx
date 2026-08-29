'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import type { LessonQuiz as Quiz } from '../learnTypes';

export function LessonQuiz({ quiz }: { quiz: Quiz }) {
  const t = useTranslations('learn');
  const [chosen, setChosen] = useState<number | null>(null);

  const answered = chosen !== null;
  const correct = chosen === quiz.answer;

  return (
    <section className="border-line bg-surface mb-8.5 rounded-sm border p-7 sm:px-7.5">
      <h2 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {t('quickCheck')}
      </h2>
      <p
        id="quiz-question"
        className="text-ink mb-5 font-serif text-[22px] leading-[1.35]"
      >
        {quiz.question}
      </p>

      <ul
        role="radiogroup"
        aria-labelledby="quiz-question"
        className="flex flex-col gap-2.5"
      >
        {quiz.options.map((option, index) => {
          const isChosen = chosen === index;
          const isAnswer = index === quiz.answer;
          const reveal = answered && isAnswer;
          const wrong = answered && isChosen && !isAnswer;

          return (
            <li key={option}>
              <button
                type="button"
                role="radio"
                aria-checked={isChosen}
                disabled={answered}
                onClick={() => setChosen(index)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-[3px] border px-4.5 py-3.5 text-left text-[15.5px]',
                  reveal && 'border-positive bg-surface-tint text-ink',
                  wrong && 'border-negative text-ink',
                  !reveal &&
                    !wrong &&
                    'border-line-strong text-ink enabled:hover:border-ink-faint',
                  answered && !reveal && !wrong && 'text-ink-faint',
                )}
              >
                <span aria-hidden className="pt-0.5 font-mono text-[13px]">
                  {reveal ? '✓' : wrong ? '✕' : '·'}
                </span>
                <span>{option}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered ? (
        <div role="status" className="mt-5">
          <p
            className={cn(
              'mb-1.5 text-[15px] font-medium',
              correct ? 'text-positive' : 'text-negative',
            )}
          >
            {correct ? t('quizCorrect') : t('quizIncorrect')}
          </p>
          <p className="text-ink-muted text-[14.5px] leading-relaxed">
            {quiz.explanation}
          </p>
        </div>
      ) : null}
    </section>
  );
}
