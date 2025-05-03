import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { formatTime } from './Timer.utils'

import { StartButton } from '@/components/atoms/Buttons'
import { Input } from '@/components/atoms/Input/Input'
import { useTimerStore } from '@/store/useTimerStore'

export const Timer = () => {
  const { startTime, setStartTime } = useTimerStore()
  const [timeCounter, setTimeCounter] = useState(formatTime(0))

  const handleStart = () => {
    setStartTime(new Date())
  }

  useEffect(() => {
    if (!startTime) {
      setTimeCounter(formatTime(0))
      return
    }

    const updateTimer = () => {
      const diff = new Date().getTime() - startTime.getTime()
      setTimeCounter(formatTime(diff))
    }

    updateTimer()

    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return (
    <TimerLayout>
      <TopContainer>
        <StartButton onClick={handleStart} />
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
