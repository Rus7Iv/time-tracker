import React from 'react'
import { ThemeProvider } from 'styled-components'

import App from '@/App'
import { useThemeStore } from '@/store/useThemeStore'
import GlobalStyles from '@/styles/GlobalStyles'
import { darkTheme, lightTheme } from '@/styles/themes'

const ThemedApp: React.FC = () => {
  const theme = useThemeStore((state) => state.theme)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  )
}

export default ThemedApp
