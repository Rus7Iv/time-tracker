import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { I18nContext } from './context'
import { setLocals } from './locals'
import { type Language } from './resources'
import { getInitialLanguage, getLocale, getMessages } from './utils'

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const locale = getLocale(language)
  const messages = useMemo(() => getMessages(language), [language])
  setLocals(language)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.setAttribute('data-lang', language)
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('app.lang', language)
      } catch {
        // ignore storage errors
      }
    }
  }, [language])

  const contextValue = useMemo(
    () => ({
      language,
      locale,
      messages,
      setLanguage,
    }),
    [language, locale, messages],
  )

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}
