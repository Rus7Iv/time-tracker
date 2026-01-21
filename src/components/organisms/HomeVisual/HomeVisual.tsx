import styled, { keyframes } from 'styled-components'

import { TimerWidget } from '@/components/molecules/TimerWidget/TimerWidget'
import { media } from '@/media/media'
import { fadeIn } from '@/styles/animations'

const DOT_COLORS = ['#FF363F', '#F422A7', '#2E335B']

const visualContent = {
  title: 'Live Session',
  time: '24:00',
  status: 'Focus Mode',
}

export const HomeVisual = () => {
  return (
    <VisualSection>
      <DesktopDashboard>
        <DashboardHeader>
          {DOT_COLORS.map((color) => (
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
  50% { transform: translateY(-15px) rotate(2deg); }
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
`

const DesktopDashboard = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 40px;
  padding: 30px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.05),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  animation: ${float} 6s ease-in-out infinite;

  ${media.isTablet} {
    display: none;
  }
`

const MobileIndicator = styled.div`
  display: none;

  ${media.isTablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${float} 6s ease-in-out infinite;
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
