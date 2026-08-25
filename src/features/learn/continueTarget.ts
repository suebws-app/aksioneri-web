import type { Lesson } from './learnTypes';

/**
 * The lesson the card points at, and whether it has been finished.
 *
 * A finished lesson still counts. Dropping it — which is what this used to do
 * — meant that ticking "mark as read" blanked the card, so the reader's last
 * action erased the only trace of where they were. The card now names the same
 * lesson either way and changes its label instead.
 */
export const continueTarget = (
  lessons: Lesson[],
  lastVisited: string | null,
  completed: Record<string, string>,
): { lesson: Lesson; done: boolean } | null => {
  if (!lastVisited) return null;

  const lesson = lessons.find((entry) => entry.slug === lastVisited);
  // The slug is persisted in the browser and the catalogue is not: a lesson
  // that has since been renamed or retired must not render a dead link.
  if (!lesson) return null;

  return { lesson, done: Boolean(completed[lastVisited]) };
};
