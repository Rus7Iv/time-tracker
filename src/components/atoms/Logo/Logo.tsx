import styled from 'styled-components'

import { TimerAnimatedIcon } from '@/assets/components/TimerAnimatedIcon'

interface IStyledLogoWithTextProps {
  className?: string
}

export const LogoWithText = ({ className }: IStyledLogoWithTextProps) => {
  return (
    <LogoContainer className={className}>
      <TimerAnimatedIcon />
      <LogoText>TimeTracker</LogoText>
      {/* TODO: убрать в будущем */}
      <AlphaTag>alpha</AlphaTag>
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

const AlphaTag = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  border: 1px solid ${({ theme }) => theme.colors.orange};
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1;
  padding: 2px 6px;
  text-transform: uppercase;
`
