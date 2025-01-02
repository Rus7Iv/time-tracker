import styled from 'styled-components'

import { ReactComponent as Logo } from '@/assets/icons/logo.svg'

interface IStyledLogoWithTextProps {
  className?: string
}

export const LogoWithText = ({ className }: IStyledLogoWithTextProps) => {
  return (
    <LogoContainer className={className}>
      <Logo />
      <LogoText>TimeTracker</LogoText>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

const LogoText = styled.span`
  color: ${({ theme }) => theme.colors.navyblue};
  font-size: 24px;
`
