import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as RollupIcon } from '@/assets/icons/rollup.svg'
import { LogoWithText } from '@/components/atoms/Logo/Logo'
import { HeaderNavItems } from '@/components/molecules/NavItems/NavItems'
import { ThemeToggle } from '@/components/molecules/ToggleTheme/ToggleTheme'
import { media } from '@/media/media'
import { useMedia } from '@/media/useMedia'
import useHeaderStore from '@/store/headerStore'

export const Header = () => {
  const { isMobile } = useMedia()
  const { isExpanded, toggleHeader } = useHeaderStore()

  return (
    <HeaderContainer $isExpanded={isExpanded}>
      <Wrapper>
        <LeftContainer>
          <StyledLink to={'/'}>
            <LogoWithText />
          </StyledLink>
        </LeftContainer>
        {!isMobile && (
          <RightContainer>
            <ThemeToggle />
          </RightContainer>
        )}
        {isMobile && (
          <MobileRollUp>
            <RollupIcon onClick={toggleHeader} />
          </MobileRollUp>
        )}
      </Wrapper>
      {isMobile && (
        <MobileMenu $isExpanded={isExpanded}>
          <MobileMenuTopRow>
            <HeaderNavItems />
            <StyledThemeToggle />
          </MobileMenuTopRow>
        </MobileMenu>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header<{ $isExpanded: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  transition: height 0.3s ease;

  ${media.isLaptop} {
    height: 90px;
  }
  ${media.isTablet} {
    height: 90px;
  }
  ${media.isMobile} {
    padding: 0 30px;
    height: ${({ $isExpanded }) => ($isExpanded ? '215px' : '70px')};
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.colors.navyblue};
  align-items: center;
  justify-content: space-between;

  ${media.isMobile} {
    max-height: 70px;
  }
`

const MobileMenu = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  position: absolute;
  top: 75px;
  gap: 20px;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 30px;
  box-sizing: border-box;
  flex-direction: column;
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  pointer-events: ${({ $isExpanded }) => ($isExpanded ? 'auto' : 'none')};
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'translateY(0)' : 'translateY(-8px)'};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  z-index: 2;
`

const MobileMenuTopRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 90px;
  align-items: center;

  ${media.isTablet} {
    gap: 40px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const StyledThemeToggle = styled(ThemeToggle)`
  margin: 1rem 0;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:last-child) {
    margin-left: 20px;
  }
`

const MobileRollUp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`
