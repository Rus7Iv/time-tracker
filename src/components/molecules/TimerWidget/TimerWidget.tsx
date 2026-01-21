import styled, { keyframes } from 'styled-components'

import { media } from '@/media/media'

const circleDash = 283 // 2 * PI * r (r=45)
const progressOffset = circleDash * 0.3

interface TimerWidgetProps {
  time: string
  status: string
  size?: string
  compact?: boolean
}

// eslint-disable-next-line prettier/prettier
export const TimerWidget = ({ time, status, size, compact }: TimerWidgetProps) => {
  return (
    <ProgressCircleWrapper $size={size}>
      <ProgressCircleSVG viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(46, 51, 91, 0.05)"
          strokeWidth="8"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </ProgressCircleSVG>
      <TimerDisplay>
        <TimeText $compact={compact}>{time}</TimeText>
        <StatusBadge $small={compact}>{status}</StatusBadge>
      </TimerDisplay>
    </ProgressCircleWrapper>
  )
}

const ProgressCircleWrapper = styled.div<{ $size?: string }>`
  position: relative;
  width: ${({ $size }) => $size || '100%'};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressCircleSVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`

const AnimatedCircle = styled.circle`
  stroke: ${({ theme }) => theme.colors.raspberry};
  stroke-dasharray: ${circleDash};
  stroke-dashoffset: ${progressOffset};
  animation: ${keyframes`
    from { stroke-dashoffset: ${circleDash}; }
    to { stroke-dashoffset: ${progressOffset}; }
  `} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`

const TimerDisplay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  ${media.isTablet} {
    gap: 4px;
  }
`

const TimeText = styled.span<{ $compact?: boolean }>`
  font-size: ${({ $compact }) => ($compact ? '28px' : '48px')};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.navyblue};
  letter-spacing: -1px;
`

const StatusBadge = styled.span<{ $small?: boolean }>`
  background: ${({ theme }) => theme.colors.gradientpink};
  color: white;
  padding: ${({ $small }) => ($small ? '2px 8px' : '4px 12px')};
  border-radius: 12px;
  font-size: ${({ $small }) => ($small ? '9px' : '11px')};
  font-weight: 700;
  text-transform: uppercase;
`
