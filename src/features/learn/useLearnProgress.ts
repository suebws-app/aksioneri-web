'use client';

import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearnProgressState {
  completed: Record<string, string>;
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

const subscribeToHydration = (onChange: () => void): (() => void) =>
  useLearnProgress.persist.onFinishHydration(onChange);

export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => useLearnProgress.persist.hasHydrated(),
    () => false,
  );
}
