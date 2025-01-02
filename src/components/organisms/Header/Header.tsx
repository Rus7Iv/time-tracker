import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as RollupIcon } from '@/assets/icons/rollup.svg'
import { LogoWithText } from '@/components/atoms/Logo/Logo'
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
        <MobileMenu>
          <BottomMobileContainer>
            <ThemeToggle />
          </BottomMobileContainer>
        </MobileMenu>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header<{ $isExpanded: boolean }>`
  display: flex;
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

const MobileMenu = styled.div`
  display: flex;
  position: absolute;
  top: 75px;
  gap: 20px;
  width: calc(100vw - 60px);
  flex-direction: column;
`

const BottomMobileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// const MobileSearchInput = styled(Input)`
//   width: calc(100vw - 60px);
// `

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
