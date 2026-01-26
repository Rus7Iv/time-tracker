import styled from 'styled-components'

import { StartButton } from '@/components/atoms/Buttons'
import { Input } from '@/components/atoms/Input/Input'
import t from '@/i18n/locals'
import { media } from '@/media/media'

type TimerControlsProps = {
  isRunning: boolean
  timeCounter: string
  description: string
  onToggle: () => void
  onDescriptionChange: (value: string) => void
}

export const TimerControls = ({
  isRunning,
  timeCounter,
  description,
  onToggle,
  onDescriptionChange,
}: TimerControlsProps) => {
  return (
    <TopContainer>
      <ControlsRow>
        <TimerStartButton
          onClick={onToggle}
          variant={isRunning ? 'end' : 'start'}
          type="button"
          aria-pressed={isRunning}
          aria-label={isRunning ? t.timerControls.stop : t.timerControls.start}
        />
        <Counter>{timeCounter}</Counter>
      </ControlsRow>
      <TimerInput
        placeholder={t.timerControls.descriptionPlaceholder}
        aria-label={t.timerControls.descriptionAriaLabel}
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
      />
    </TopContainer>
  )
}

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  gap: 20px;

  ${media.isTablet} {
    height: auto;
    flex-wrap: wrap;
    gap: 16px;
  }

  ${media.isMobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.isMobile} {
    justify-content: center;
  }
`

const TimerStartButton = styled(StartButton)`
  min-width: 80px;
  width: 80px;
  height: 80px;

  ${media.isMobile} {
    min-width: 64px;
    width: 64px;
    height: 64px;
  }
`

const Counter = styled.div`
  font-size: 30px;
  min-width: 124px;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';

  ${media.isMobile} {
    font-size: 26px;
  }
`

const TimerInput = styled(Input)`
  flex: 1;
  min-width: 220px;

  ${media.isMobile} {
    min-width: 100%;
    font-size: 22px;
  }
`
