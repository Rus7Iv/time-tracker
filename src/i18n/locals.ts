import type { Language } from './resources'
import {
  createLocals,
  getInitialLanguage,
  getLocale,
  getMessages,
} from './utils'

export type Locals = ReturnType<typeof createLocals>

let activeLanguage: Language = getInitialLanguage()
let activeLocale = getLocale(activeLanguage)
let activeMessages = getMessages(activeLanguage)

export let t: Locals = createLocals(activeMessages, activeLocale)

export const setLocals = (language: Language) => {
  if (language === activeLanguage) {
    return t
  }
  activeLanguage = language
  activeLocale = getLocale(language)
  activeMessages = getMessages(language)
  t = createLocals(activeMessages, activeLocale)
  return t
}

export default t
