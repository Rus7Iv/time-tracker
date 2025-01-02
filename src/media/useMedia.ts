import { useEffect, useState } from 'react'

import { breakpoints } from './media'

export const useMedia = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isLaptop, setIsLaptop] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  const updateMedia = () => {
    const width = window.innerWidth
    setIsMobile(width <= breakpoints.mobile)
    setIsTablet(width > breakpoints.mobile && width <= breakpoints.tablet)
    setIsLaptop(width > breakpoints.tablet && width <= breakpoints.laptop)
    setIsDesktop(width > breakpoints.laptop)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  return { isMobile, isTablet, isLaptop, isDesktop }
}
