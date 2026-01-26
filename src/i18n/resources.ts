import en from './locales/en.json'
import ru from './locales/ru.json'

export const resources = {
  ru,
  en,
} as const

export type Language = keyof typeof resources
export type Messages = (typeof resources)[Language]
