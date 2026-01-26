import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'styled-components'

import App from '@/App'
import { I18nProvider } from '@/i18n/I18nProvider'
import { useThemeStore } from '@/store/useThemeStore'
import GlobalStyles from '@/styles/GlobalStyles'
import { darkTheme, lightTheme } from '@/styles/themes'

const ThemedApp: React.FC = () => {
  const theme = useThemeStore((state) => state.theme)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  useEffect(() => {
    const themeColor =
      theme === 'light' ? lightTheme.colors.cream : darkTheme.colors.cream
    const metas = document.querySelectorAll('meta[name="theme-color"]')
    if (metas.length === 0) {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      meta.setAttribute('content', themeColor)
      document.head.appendChild(meta)
      return
    }
    metas.forEach((meta) => {
      meta.setAttribute('content', themeColor)
    })
  }, [theme])

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <I18nProvider>
        <App />
        <Analytics />
      </I18nProvider>
    </ThemeProvider>
  )
}

export default ThemedApp
