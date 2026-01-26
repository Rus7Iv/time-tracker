import { type FormEvent } from 'react'
import styled from 'styled-components'

import { Input } from '@/components/atoms/Input/Input'
import {
  formatDuration,
  formatTimeRange,
  type TimerEventData,
} from '@/components/templates/Timer/Timer.utils'
import t from '@/i18n/locals'
import { useLocale } from '@/i18n/useI18n'
import { media } from '@/media/media'

export type EditDraft = {
  description: string
  startTime: string
  endTime: string
}

export type DraftTimes = {
  start: Date
  end: Date
}

type TimerEventCardProps = {
  event: TimerEventData
  isEditing: boolean
  editDraft: EditDraft | null
  draftTimes: DraftTimes | null
  hasValidDraft: boolean
  onEditStart: () => void
  onEditCancel: () => void
  onEditSubmit: (formEvent: FormEvent<HTMLFormElement>) => void
  onDelete: () => void
  onEditDraftChange: (updates: Partial<EditDraft>) => void
}

export const TimerEventCard = ({
  event,
  isEditing,
  editDraft,
  draftTimes,
  hasValidDraft,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onDelete,
  onEditDraftChange,
}: TimerEventCardProps) => {
  const locale = useLocale()
  const timeRangeLabel =
    isEditing && draftTimes
      ? formatTimeRange(draftTimes.start, draftTimes.end, locale)
      : formatTimeRange(event.startTime, event.endTime, locale)

  const durationLabel =
    isEditing && draftTimes && hasValidDraft
      ? formatDuration(draftTimes.start, draftTimes.end)
      : formatDuration(event.startTime, event.endTime)

  return (
    <EventCard $isEditing={isEditing}>
      <EventCardHeader>
        <EventTime>{timeRangeLabel}</EventTime>
        {!isEditing && (
          <EventActions $isEditing={isEditing}>
            <EventActionButton
              type="button"
              onClick={onEditStart}
              aria-label={t.timerEventCard.editAria}
            >
              {t.timerEventCard.edit}
            </EventActionButton>
            <EventActionButton
              type="button"
              $variant="danger"
              onClick={onDelete}
              aria-label={t.timerEventCard.deleteAria}
            >
              {t.timerEventCard.delete}
            </EventActionButton>
          </EventActions>
        )}
      </EventCardHeader>
      {isEditing ? (
        <EditForm onSubmit={onEditSubmit}>
          <EditTimeRow>
            <TimeInput
              type="time"
              step="1"
              value={editDraft?.startTime ?? ''}
              onChange={(event) =>
                onEditDraftChange({ startTime: event.target.value })
              }
              aria-label={t.timerEventCard.startTimeAriaLabel}
            />
            <TimeSeparator>{t.common.timeSeparator}</TimeSeparator>
            <TimeInput
              type="time"
              step="1"
              value={editDraft?.endTime ?? ''}
              onChange={(event) =>
                onEditDraftChange({ endTime: event.target.value })
              }
              aria-label={t.timerEventCard.endTimeAriaLabel}
            />
          </EditTimeRow>
          <EventDescriptionInput
            placeholder={t.timerEventCard.descriptionPlaceholder}
            aria-label={t.timerEventCard.descriptionAriaLabel}
            value={editDraft?.description ?? ''}
            onChange={(event) =>
              onEditDraftChange({ description: event.target.value })
            }
          />
          <EventActions $isEditing={isEditing}>
            <EventActionButton
              type="submit"
              $variant="primary"
              disabled={!hasValidDraft}
              aria-label={t.timerEventCard.saveAria}
            >
              {t.timerEventCard.save}
            </EventActionButton>
            <EventActionButton
              type="button"
              onClick={onEditCancel}
              aria-label={t.timerEventCard.cancelAria}
            >
              {t.timerEventCard.cancel}
            </EventActionButton>
          </EventActions>
          {!hasValidDraft && (
            <EditHint>{t.timerEventCard.invalidHint}</EditHint>
          )}
        </EditForm>
      ) : (
        <EventDescription>{event.description}</EventDescription>
      )}
      <EventDuration>{durationLabel}</EventDuration>
    </EventCard>
  )
}

const EventCard = styled.div<{ $isEditing?: boolean }>`
  background: ${({ theme }) => theme.colors.cream};
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid transparent;
  transition:
    box-shadow 0.2s,
    border-color 0.2s,
    background-color 0.2s;

  ${({ $isEditing, theme }) =>
    $isEditing &&
    `
      background: ${theme.colors.linen};
      border-color: ${theme.colors.parchment};
      box-shadow: 0 14px 26px rgba(0, 0, 0, 0.08);
    `}
`

const EventCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const EventActions = styled.div<{ $isEditing?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  opacity: ${({ $isEditing }) => ($isEditing ? 1 : 0)};
  transform: ${({ $isEditing }) =>
    $isEditing ? 'translateY(0)' : 'translateY(4px)'};
  pointer-events: ${({ $isEditing }) => ($isEditing ? 'auto' : 'none')};
  transition:
    opacity 0.2s,
    transform 0.2s;

  ${EventCard}:hover &,
  ${EventCard}:focus-within & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  ${media.isMobile} {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`

const EventActionButton = styled.button<{
  $variant?: 'primary' | 'ghost' | 'danger'
}>`
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'primary' || $variant === 'danger'
        ? theme.colors.raspberry
        : theme.colors.parchment};
  border-radius: 999px;
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.gradientpink : theme.colors.cream};
  color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.cream
      : $variant === 'danger'
        ? theme.colors.raspberry
        : theme.colors.navyblue};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
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

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EditTimeRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
`

const TimeInput = styled.input`
  appearance: textfield;
  border: 1px solid ${({ theme }) => theme.colors.parchment};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.linen};
  color: ${({ theme }) => theme.colors.navyblue};
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  text-align: center;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::-webkit-clear-button {
    display: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.raspberry};
    background: ${({ theme }) => theme.colors.palegray};
  }
`

const TimeSeparator = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => `${theme.colors.navyblue}70`};
`

const EventDescriptionInput = styled(Input)`
  input {
    height: 46px;
    font-size: 18px;
    padding: 0 44px 0 18px;
  }
`

const EditHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.raspberry};
`

const EventDuration = styled.div`
  font-size: 12px;
  color: ${({ theme }) => `${theme.colors.navyblue}70`};

  ${media.isMobile} {
    font-size: 16px;
  }
`
