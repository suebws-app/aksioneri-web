import type { Lesson } from './learnTypes';

export const continueTarget = (
  lessons: Lesson[],
  lastVisited: string | null,
  completed: Record<string, string>,
): { lesson: Lesson; done: boolean } | null => {
  if (!lastVisited) return null;

  const lesson = lessons.find((entry) => entry.slug === lastVisited);
  if (!lesson) return null;

  return { lesson, done: Boolean(completed[lastVisited]) };
};
