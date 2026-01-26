import { type FormEvent, useMemo, useState } from 'react'
import styled from 'styled-components'

import {
  type DraftTimes,
  type EditDraft,
  TimerEventCard,
} from '@/components/molecules/TimerEventCard/TimerEventCard'
import {
  applyTimeToDate,
  formatDayLabel,
  formatTimeInputValue,
  getEventsLabel,
  groupEventsByDay,
  type TimerEventData,
} from '@/components/templates/Timer/Timer.utils'

type TimerEventsProps = {
  events: TimerEventData[]
  onUpdateEvent: (id: string, updates: Partial<TimerEventData>) => void
}

const labels = {
  listTitle: 'История активностей',
  emptyState: 'Пока нет активностей. Запустите таймер, чтобы начать.',
}

const getDraftTimes = (
  event: TimerEventData,
  draft: EditDraft | null,
): DraftTimes | null => {
  if (!draft) {
    return null
  }
  const start = applyTimeToDate(event.startTime, draft.startTime)
  const end = applyTimeToDate(event.endTime, draft.endTime)
  if (!start || !end) {
    return null
  }
  return { start, end }
}

export const TimerEvents = ({ events, onUpdateEvent }: TimerEventsProps) => {
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null)

  const handleEditStart = (event: TimerEventData) => {
    setEditingEventId(event.id)
    setEditDraft({
      description: event.description,
      startTime: formatTimeInputValue(event.startTime),
      endTime: formatTimeInputValue(event.endTime),
    })
  }

  const handleEditCancel = () => {
    setEditingEventId(null)
    setEditDraft(null)
  }

  const handleEditDraftChange = (updates: Partial<EditDraft>) => {
    setEditDraft((prev) => (prev ? { ...prev, ...updates } : prev))
  }

  const handleEditSave = (event: TimerEventData) => {
    if (!editDraft) {
      return
    }
    const times = getDraftTimes(event, editDraft)
    if (!times || times.end.getTime() <= times.start.getTime()) {
      return
    }
    onUpdateEvent(event.id, {
      description: editDraft.description.trim() || 'No description',
      startTime: times.start,
      endTime: times.end,
    })
    handleEditCancel()
  }

  const handleEditSubmit = (
    formEvent: FormEvent<HTMLFormElement>,
    event: TimerEventData,
  ) => {
    formEvent.preventDefault()
    handleEditSave(event)
  }

  const groupedEvents = useMemo(() => groupEventsByDay(events), [events])

  return (
    <EventsListSection>
      <EventsListHeader>
        <EventsListTitle>{labels.listTitle}</EventsListTitle>
        <EventsListMeta>
          {events.length} {getEventsLabel(events.length)}
        </EventsListMeta>
      </EventsListHeader>
      <EventsListScroller>
        {events.length === 0 ? (
          <EmptyState>{labels.emptyState}</EmptyState>
        ) : (
          <DayList>
            {groupedEvents.map((group) => (
              <DaySection key={group.date.toISOString()}>
                <DayHeader>
                  <DayTitle>{formatDayLabel(group.date)}</DayTitle>
                </DayHeader>
                <DayEvents>
                  {group.items.map((event) => {
                    const isEditing = event.id === editingEventId
                    const draftTimes = isEditing
                      ? getDraftTimes(event, editDraft)
                      : null
                    const hasValidDraft = isEditing
                      ? Boolean(
                          draftTimes &&
                            draftTimes.end.getTime() >
                              draftTimes.start.getTime(),
                        )
                      : true
                    return (
                      <TimerEventCard
                        key={event.id}
                        event={event}
                        isEditing={isEditing}
                        editDraft={isEditing ? editDraft : null}
                        draftTimes={draftTimes}
                        hasValidDraft={hasValidDraft}
                        onEditStart={() => handleEditStart(event)}
                        onEditCancel={handleEditCancel}
                        onEditSubmit={(formEvent) =>
                          handleEditSubmit(formEvent, event)
                        }
                        onEditDraftChange={handleEditDraftChange}
                      />
                    )
                  })}
                </DayEvents>
              </DaySection>
            ))}
          </DayList>
        )}
      </EventsListScroller>
    </EventsListSection>
  )
}

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
