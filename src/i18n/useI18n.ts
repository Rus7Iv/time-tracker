import { useContext } from 'react'

import { I18nContext } from './context'

export const useI18n = () => {
  const contextValue = useContext(I18nContext)
  if (!contextValue) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return contextValue
}

export const useLocale = () => useI18n().locale
