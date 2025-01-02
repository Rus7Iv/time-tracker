import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { media } from '../../../media/media'

import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg'
import { ReactComponent as RollUp } from '@/assets/icons/rollup.svg'
// import { ReactComponent as Calculator } from '@/assets/icons/calculator.svg'
// import { ReactComponent as Cardholder } from '@/assets/icons/cardholder.svg'
import { ReactComponent as Timer } from '@/assets/icons/timer.svg'

interface NavItemsProps {
  $isExpanded: boolean
  onAction?: () => void
}

interface TextWrapperProps {
  $isExpanded: boolean
}

export const NavItems = ({ $isExpanded }: NavItemsProps) => {
  return (
    <StyledNavItems>
      <NavItem to={'/'}>
        <HomeIcon />
        <TextWrapper $isExpanded={$isExpanded}>
          <Text>Главная</Text>
        </TextWrapper>
      </NavItem>
      <NavItem to={'/timer'}>
        <Timer />
        <TextWrapper $isExpanded={$isExpanded}>
          <Text>Таймер</Text>
        </TextWrapper>
      </NavItem>
      {/* <NavItem to={'/calculator'}>
        <Calculator />
        <TextWrapper $isExpanded={$isExpanded}>
          <Text>Калькулятор</Text>
        </TextWrapper>
      </NavItem>
      <NavItem to={'/payments'}>
        <Cardholder />
        <TextWrapper $isExpanded={$isExpanded}>
          <Text>Платежи</Text>
        </TextWrapper>
      </NavItem> */}
    </StyledNavItems>
  )
}

export const FooterNavItems = ({ $isExpanded, onAction }: NavItemsProps) => {
  return (
    <StyledFooterNavItems>
      <FooterNavItem onClick={onAction}>
        <RollUp />
        <TextWrapper $isExpanded={$isExpanded}>
          <Text>Свернуть</Text>
        </TextWrapper>
      </FooterNavItem>
    </StyledFooterNavItems>
  )
}

const StyledNavItems = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
`

const StyledFooterNavItems = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 18px;
  bottom: 75px;

  ${media.isTablet} {
    bottom: 35px;
  }
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.colors.navyblue};
`

const FooterNavItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.colors.navyblue};
`

const TextWrapper = styled.div<TextWrapperProps>`
  width: 100px;
  position: absolute;
  left: 50px;
  overflow: hidden;
  white-space: nowrap;
  transition: transform 0.3s ease;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'translateX(0)' : 'translateX(100%)'};
`

const Text = styled.span`
  display: block;
`
