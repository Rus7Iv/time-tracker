import styled from 'styled-components'

import { ReactComponent as MoonIcon } from '@/assets/icons/moon.svg'
import { ReactComponent as SunIcon } from '@/assets/icons/sun.svg'
import { Toggle } from '@/components/atoms/Toggle/Toggle'
import { useThemeStore } from '@/store/useThemeStore'

export const ThemeToggle = () => {
  const themeMode = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  const handleThemeChange = (checked: boolean) => {
    if (checked && themeMode === 'light') {
      toggleTheme()
    } else if (!checked && themeMode === 'dark') {
      toggleTheme()
    }
  }

  return (
    <ToggleContainer
      checked={themeMode === 'dark'}
      leftLabel={<SunIcon />}
      rightLabel={<MoonIcon />}
      onChange={handleThemeChange}
    />
  )
}

const ToggleContainer = styled(Toggle)`
  width: 60px;
  z-index: 0;
`
