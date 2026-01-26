import styled, { keyframes, useTheme } from 'styled-components'

import { TimerWidget } from '@/components/molecules/TimerWidget/TimerWidget'
import t from '@/i18n/locals'
import { media } from '@/media/media'
import { fadeIn } from '@/styles/animations'
import { adjustBrightness, withAlpha } from '@/styles/colorUtils'

export const HomeVisual = () => {
  const theme = useTheme()
  const visualContent = {
    title: t.homeVisual.title,
    time: '24:00',
    status: t.homeVisual.status,
  }
  const dotColors = [
    theme.colors.red,
    theme.colors.raspberry,
    theme.colors.navyblue,
  ]

  return (
    <VisualSection>
      <DesktopDashboard>
        <DashboardHeader>
          {dotColors.map((color) => (
            <Dot key={color} $color={color} />
          ))}
          <DashboardTitle>{visualContent.title}</DashboardTitle>
        </DashboardHeader>
        <DashboardContent>
          <TimerWidget
            time={visualContent.time}
            status={visualContent.status}
          />
        </DashboardContent>
      </DesktopDashboard>

      <MobileIndicator>
        <TimerWidget
          time={visualContent.time}
          status={visualContent.status}
          size="160px"
          compact
        />
      </MobileIndicator>
    </VisualSection>
  )
}

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`

const VisualSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${fadeIn} 1s ease-out 0.2s both;

  ${media.isTablet} {
    order: 1;
    margin-bottom: 10px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const DesktopDashboard = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) =>
    withAlpha(adjustBrightness(theme.colors.cream, 0.06), 0.9)};
  border: 1px solid
    ${({ theme }) => withAlpha(adjustBrightness(theme.colors.cream, 0.2), 0.75)};
  border-radius: 40px;
  padding: 30px;
  box-shadow:
    0 16px 36px ${({ theme }) => withAlpha(theme.colors.navyblue, 0.08)},
    inset 0 0 20px
      ${({ theme }) =>
        withAlpha(adjustBrightness(theme.colors.cream, 0.12), 0.6)};
  animation: ${float} 8s ease-in-out infinite;
  will-change: transform;

  @supports (backdrop-filter: blur(12px)) {
    background: ${({ theme }) =>
      withAlpha(adjustBrightness(theme.colors.cream, 0.08), 0.7)};
    backdrop-filter: blur(12px);
  }

  ${media.isTablet} {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const MobileIndicator = styled.div`
  display: none;

  ${media.isTablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${float} 8s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
`

const Dot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  opacity: 0.6;
`

const DashboardTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navyblue};
  margin-left: 10px;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const DashboardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
