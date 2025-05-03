import { useEffect, useState } from 'react'

import { formatTime } from '@/components/templates/Timer/Timer.utils'

export const useElapsedTime = (startTime: Date | null) => {
  const [timeCounter, setTimeCounter] = useState(formatTime(0))

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

  return timeCounter
}
