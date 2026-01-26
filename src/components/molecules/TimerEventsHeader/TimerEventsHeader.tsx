import styled from 'styled-components'

import { getEventsLabel } from '@/components/templates/Timer/Timer.utils'

type TimerEventsHeaderProps = {
  title: string
  count: number
}

export const TimerEventsHeader = ({ title, count }: TimerEventsHeaderProps) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Meta>
        {count} {getEventsLabel(count)}
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
