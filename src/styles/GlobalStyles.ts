import { createGlobalStyle } from 'styled-components'

import { media } from '@/media/media'

const GlobalStyles = createGlobalStyle`
:root {
  font-family: 'Gilroy Bold', 'Gilroy', sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: ${({ theme }) => theme.colors.navyblue};
  background-color: ${({ theme }) => theme.colors.cream};

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Gilroy Bold', sans-serif;
}

input::placeholder {
  font-family: 'Gilroy', sans-serif;
  color: ${({ theme }) => theme.colors.navyblue};
  opacity: 0.5;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin-right: 25px;

  ${media.isMobile} {
    appearance: none;
    margin-right: 0;
  }
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

::-webkit-scrollbar {
  background-color: ${({ theme }) => theme.colors.cream};
  border-radius: 20px;

  ${media.isTablet} {
    background-color: transparent;
    width: 4px;
  }
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.colors.raspberry};
  border-radius: 20px;

  ${media.isTablet} {
    background-color: ${({ theme }) => theme.colors.creamshadow};
    width: 4px;
  }
}
`

export default GlobalStyles
