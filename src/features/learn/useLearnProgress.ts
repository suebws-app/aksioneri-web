'use client';

import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Which lessons the reader has finished.
 *
 * Kept in `localStorage` rather than on a server: the site has no accounts,
 * and requiring one to tick a lesson would cost far more readers than the
 * feature is worth. The trade is that progress is per-device and disappears
 * if the browser is cleared, which is an acceptable loss for free educational
 * content and is stated in the UI.
 *
 * ## The hydration trap
 *
 * The server renders this page with no knowledge of `localStorage`, so its
 * HTML always says "nothing completed". The browser then reads the store and
 * disagrees. Rendering the real state immediately produces a hydration
 * mismatch and a visible flicker of un-ticked lessons.
 *
 * `useHasHydrated` is the guard: every consumer renders the empty state until
 * it returns true. Read it, do not work around it.
 */

interface LearnProgressState {
  /** Lesson slug to the ISO instant it was marked complete. */
  completed: Record<string, string>;
  /** The last lesson opened, for "continue where you left off". */
  lastVisited: string | null;
  markComplete: (slug: string) => void;
  markIncomplete: (slug: string) => void;
  setLastVisited: (slug: string) => void;
  clearAll: () => void;
}

export const useLearnProgress = create<LearnProgressState>()(
  persist(
    (set) => ({
      completed: {},
      lastVisited: null,

      markComplete: (slug) =>
        set((state) => ({
          completed: { ...state.completed, [slug]: new Date().toISOString() },
        })),

      markIncomplete: (slug) =>
        set((state) => ({
          completed: Object.fromEntries(
            Object.entries(state.completed).filter(([key]) => key !== slug),
          ),
        })),

      setLastVisited: (slug) => set({ lastVisited: slug }),

      clearAll: () => set({ completed: {}, lastVisited: null }),
    }),
    {
      name: 'aksioneri.learn-progress',
      version: 1,
    },
  ),
);

/**
 * Whether the persisted state has been read from `localStorage` yet.
 *
 * Zustand's `persist` rehydrates asynchronously, so on the very first client
 * render the store still holds its initial empty value — which is what the
 * server rendered. Waiting for this flag keeps the two in agreement.
 *
 * `useSyncExternalStore` is the right primitive rather than `useState` plus an
 * effect: it subscribes properly, and its third argument is the value used
 * during server rendering, which is exactly the distinction being drawn here.
 */
const subscribeToHydration = (onChange: () => void): (() => void) =>
  useLearnProgress.persist.onFinishHydration(onChange);

export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => useLearnProgress.persist.hasHydrated(),
    () => false,
  );
}
