import { styled } from 'styled-components'

import { TimerControls } from '@/components/organisms/TimerControls/TimerControls'
import { TimerEvents } from '@/components/organisms/TimerEvents/TimerEvents'
import { createEventId } from '@/components/templates/Timer/Timer.utils'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { media } from '@/media/media'
import { useElapsedTime } from '@/store/useElapsedTime'
import { useTimerStore } from '@/store/useTimerStore'

export const Timer = () => {
  useDocumentTitle('TimeTracker')
  const startTime = useTimerStore((state) => state.startTime)
  const setStartTime = useTimerStore((state) => state.setStartTime)
  const description = useTimerStore((state) => state.description)
  const setDescription = useTimerStore((state) => state.setDescription)
  const events = useTimerStore((state) => state.events)
  const addEvent = useTimerStore((state) => state.addEvent)
  const updateEvent = useTimerStore((state) => state.updateEvent)
  const removeEvent = useTimerStore((state) => state.removeEvent)
  const timeCounter = useElapsedTime(startTime)
  const isRunning = Boolean(startTime)

  const handleToggle = () => {
    if (!startTime) {
      setStartTime(new Date())
      return
    }

    const endTime = new Date()
    addEvent({
      id: createEventId(startTime, endTime),
      startTime,
      endTime,
      description: description.trim() || 'No description',
    })
    setDescription('')
    setStartTime(null)
  }

  return (
    <TimerLayout>
      <PageTitle>Таймер</PageTitle>
      <TimerControls
        isRunning={isRunning}
        timeCounter={timeCounter}
        description={description}
        onToggle={handleToggle}
        onDescriptionChange={setDescription}
      />
      <TimerEvents
        events={events}
        onUpdateEvent={updateEvent}
        onDeleteEvent={removeEvent}
      />
    </TimerLayout>
  )
}

const TimerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  gap: 24px;

  ${media.isTablet} {
    gap: 20px;
  }

  ${media.isMobile} {
    gap: 16px;
  }
`

// Needed for robots
const PageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
