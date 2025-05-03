import { useEffect } from 'react'

import { useElapsedTime } from '@/store/useElapsedTime'
import { useTimerStore } from '@/store/useTimerStore'

const useDocumentTitle = (title: string) => {
  const { startTime } = useTimerStore()
  const timeCounter = useElapsedTime(startTime)

  useEffect(() => {
    if (!startTime) {
      document.title = title
    } else {
      document.title = timeCounter
    }
  }, [startTime, timeCounter, title])
}

export default useDocumentTitle
