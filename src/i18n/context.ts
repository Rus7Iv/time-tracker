import { createContext } from 'react'

import type { Language, Messages } from './resources'

export type I18nContextValue = {
  language: Language
  locale: string
  messages: Messages
  setLanguage: (language: Language) => void
}

export const I18nContext = createContext<I18nContextValue | undefined>(
  undefined,
)
