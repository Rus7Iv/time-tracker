import { useEffect } from 'react'
import styled from 'styled-components'

import {
  formatTimeRange,
  type TimerEventData,
} from '@/components/templates/Timer/Timer.utils'
import t from '@/i18n/locals'
import { useLocale } from '@/i18n/useI18n'

type TimerDeleteDialogProps = {
  event: TimerEventData | null
  onCancel: () => void
  onConfirm: () => void
}

export const TimerDeleteDialog = ({
  event,
  onCancel,
  onConfirm,
}: TimerDeleteDialogProps) => {
  const locale = useLocale()
  useEffect(() => {
    if (!event) {
      return
    }
    const handleKeyDown = (keydownEvent: KeyboardEvent) => {
      if (keydownEvent.key === 'Escape') {
        keydownEvent.preventDefault()
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [event, onCancel])

  if (!event) {
    return null
  }

  return (
    <Overlay onClick={onCancel}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <Title id="confirm-delete-title">{t.timerDeleteDialog.title}</Title>
        <Description id="confirm-delete-description">
          {t.timerDeleteDialog.description}
        </Description>
        <Meta>
          <MetaLabel>
            {event.description || t.timerDeleteDialog.detailsFallback}
          </MetaLabel>
          <MetaValue>
            {formatTimeRange(event.startTime, event.endTime, locale)}
          </MetaValue>
        </Meta>
        <Actions>
          <ActionButton type="button" onClick={onCancel}>
            {t.timerDeleteDialog.cancel}
          </ActionButton>
          <ActionButton type="button" $variant="danger" onClick={onConfirm}>
            {t.timerDeleteDialog.confirm}
          </ActionButton>
        </Actions>
      </Dialog>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 22, 45, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 10;
`

const Dialog = styled.div`
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.cream};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.parchment};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.navyblue};
`

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => `${theme.colors.navyblue}90`};
`

const Meta = styled.div`
  background: ${({ theme }) => theme.colors.linen};
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.parchment};
`

const MetaLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navyblue};
`

const MetaValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => `${theme.colors.navyblue}70`};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`

const ActionButton = styled.button<{ $variant?: 'danger' | 'ghost' }>`
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'danger' ? theme.colors.raspberry : theme.colors.parchment};
  border-radius: 999px;
  background: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.gradientpink : theme.colors.cream};
  color: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.cream : theme.colors.navyblue};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
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
`
