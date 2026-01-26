import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TimeStore = {
  startTime: Date | null
  setStartTime: (time: Date | null) => void
  description: string
  setDescription: (desc: string) => void
  events: TimerEvent[]
  addEvent: (event: TimerEvent) => void
  updateEvent: (id: string, updates: Partial<TimerEvent>) => void
  removeEvent: (id: string) => void
}

type TimerEvent = {
  id: string
  startTime: Date
  endTime: Date
  description: string
}

export const useTimerStore = create<TimeStore>()(
  persist(
    (set) => ({
      startTime: null,
      setStartTime: (time) => set({ startTime: time }),
      description: '',
      setDescription: (desc) => set({ description: desc }),
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event,
          ),
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
    }),
    {
      name: 'timer-counter-storage',
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (
            (key === 'startTime' || key === 'endTime') &&
            typeof value === 'string'
          ) {
            return new Date(value)
          }
          return value
        },
      }),
    },
  ),
)
