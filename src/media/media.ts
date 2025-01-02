export const breakpoints = {
  mobile: 640,
  tablet: 1080,
  laptop: 1280,
  desktop: 1920,
}

export const media = {
  isMobile: `@media (max-width: ${breakpoints.mobile}px)`,
  isTablet: `@media (max-width: ${breakpoints.tablet}px)`,
  isLaptop: `@media (max-width: ${breakpoints.laptop}px)`,
  isDesktop: `@media (max-width: ${breakpoints.desktop}px)`,
}
