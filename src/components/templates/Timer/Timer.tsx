import { useMemo } from 'react'
import { styled } from 'styled-components'

import { StartButton } from '@/components/atoms/Buttons'
import { Input } from '@/components/atoms/Input/Input'
import {
  formatDayLabel,
  formatDuration,
  formatTimeRange,
  getEventsLabel,
  groupEventsByDay,
} from '@/components/templates/Timer/Timer.utils'
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
  const timeCounter = useElapsedTime(startTime)

  const handleStart = () => {
    if (startTime) {
      const endTime = new Date()
      addEvent({
        id: `${startTime.getTime()}-${endTime.getTime()}`,
        startTime,
        endTime,
        description: description.trim() || 'No description',
      })
      setDescription('')
      setStartTime(null)
    } else {
      setStartTime(new Date())
    }
  }

  const groupedEvents = useMemo(() => groupEventsByDay(events), [events])

  return (
    <TimerLayout>
      <TopContainer>
        <ControlsRow>
          <TimerStartButton
            onClick={handleStart}
            variant={startTime ? 'end' : 'start'}
          />
          <Counter>{timeCounter}</Counter>
        </ControlsRow>
        <TimerInput
          placeholder="Введите название"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </TopContainer>
      <EventsListSection>
        <EventsListHeader>
          <EventsListTitle>Список событий</EventsListTitle>
          <EventsListMeta>
            {events.length} {getEventsLabel(events.length)}
          </EventsListMeta>
        </EventsListHeader>
        <EventsListScroller>
          {events.length === 0 ? (
            <EmptyState>Сохраненных событий пока нет.</EmptyState>
          ) : (
            <DayList>
              {groupedEvents.map((group) => (
                <DaySection key={group.date.toISOString()}>
                  <DayHeader>
                    <DayTitle>{formatDayLabel(group.date)}</DayTitle>
                  </DayHeader>
                  <DayEvents>
                    {group.items.map((event) => (
                      <EventCard key={event.id}>
                        <EventTime>
                          {formatTimeRange(event.startTime, event.endTime)}
                        </EventTime>
                        <EventDescription>{event.description}</EventDescription>
                        <EventDuration>
                          {formatDuration(event.startTime, event.endTime)}
                        </EventDuration>
                      </EventCard>
                    ))}
                  </DayEvents>
                </DaySection>
              ))}
            </DayList>
          )}
        </EventsListScroller>
      </EventsListSection>
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

const EventsListSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 16px;
`

const EventsListHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const EventsListTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.2px;
`

const EventsListMeta = styled.span`
  font-size: 16px;
  color: ${({ theme }) => `${theme.colors.navyblue}80`};
`

const EventsListScroller = styled.div`
  flex: 1;
  overflow: auto;
  padding: 12px 6px 12px 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.linen};
  border: 1px solid ${({ theme }) => theme.colors.parchment};
`

const EmptyState = styled.div`
  padding: 24px;
  font-size: 20px;
  color: ${({ theme }) => `${theme.colors.navyblue}80`};
`

const DayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 18px 18px 18px;
`

const DaySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DayTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`

const DayEvents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`

const EventCard = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const EventTime = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: ${({ theme }) => `${theme.colors.navyblue}80`};

  ${media.isMobile} {
    font-size: 16px;
  }
`

const EventDescription = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navyblue};
`

const EventDuration = styled.div`
  font-size: 12px;
  color: ${({ theme }) => `${theme.colors.navyblue}70`};

  ${media.isMobile} {
    font-size: 16px;
  }
`
