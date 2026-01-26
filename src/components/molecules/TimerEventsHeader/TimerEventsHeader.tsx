import styled from 'styled-components'

import t from '@/i18n/locals'

type TimerEventsHeaderProps = {
  title: string
  count: number
}

export const TimerEventsHeader = ({ title, count }: TimerEventsHeaderProps) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Meta>
        {count} {t.events.label(count)}
      </Meta>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.2px;
`

const Meta = styled.span`
  font-size: 16px;
  color: ${({ theme }) => `${theme.colors.navyblue}80`};
`
