const colorPairs = {
  palegray: { light: '#EEEDEB', dark: '#2B2B2B' },
  cream: { light: '#FCFBF9', dark: '#1C1C1C' },
  navyblue: { light: '#2E335B', dark: '#AAB1D6' },
  raspberry: { light: '#E34255', dark: '#FF6B7D' },
  linen: { light: '#F5F3F0', dark: '#2D2D2D' },
  parchment: { light: '#EEE9E4', dark: '#3A3A3A' },
  creamshadow: { light: '#D9D9D9', dark: '#3b3b3b' },
}

export const lightTheme = {
  colors: Object.fromEntries(
    Object.entries(colorPairs).map(([key, value]) => [key, value.light]),
  ),
}

export const darkTheme = {
  colors: Object.fromEntries(
    Object.entries(colorPairs).map(([key, value]) => [key, value.dark]),
  ),
}
