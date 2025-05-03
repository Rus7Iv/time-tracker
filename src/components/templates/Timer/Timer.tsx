import { styled } from 'styled-components'

import { StartButton } from '@/components/atoms/Buttons'
import { Input } from '@/components/atoms/Input/Input'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useElapsedTime } from '@/store/useElapsedTime'
import { useTimerStore } from '@/store/useTimerStore'

export const Timer = () => {
  useDocumentTitle('TimeTracker')
  const { startTime, setStartTime } = useTimerStore()
  const timeCounter = useElapsedTime(startTime)

  const handleStart = () => {
    if (startTime) {
      setStartTime(null)
    } else {
      setStartTime(new Date())
    }
  }

  return (
    <TimerLayout>
      <TopContainer>
        <StartButton
          onClick={handleStart}
          variant={startTime ? 'end' : 'start'}
        />
        <Counter>{timeCounter}</Counter>
        <Input placeholder="Введите название" />
      </TopContainer>
    </TimerLayout>
  )
}

const TimerLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  gap: 20px;
`

const Counter = styled.div`
  font-size: 30px;
  min-width: 124px;
`
