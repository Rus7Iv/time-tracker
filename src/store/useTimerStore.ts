import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TimeStore = {
  startTime: Date | null
  setStartTime: (time: Date | null) => void
  description: string
  setDescription: (desc: string) => void
}

export const useTimerStore = create<TimeStore>()(
  persist(
    (set) => ({
      startTime: null,
      setStartTime: (time) => set({ startTime: time }),
      description: '',
      setDescription: (desc) => set({ description: desc }),
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
