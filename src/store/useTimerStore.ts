import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TimeStore = {
  startTime: Date | null
  setStartTime: (time: Date | null) => void
}

export const useTimerStore = create<TimeStore>()(
  persist(
    (set) => ({
      startTime: null,
      setStartTime: (time) => set({ startTime: time }),
    }),
    {
      name: 'timer-counter-storage',
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === 'startTime' && typeof value === 'string') {
            return new Date(value)
          }
          return value
        },
      }),
    },
  ),
)
