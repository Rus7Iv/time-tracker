import { Link } from 'react-router-dom'
import styled from 'styled-components'

import t from '@/i18n/locals'

export const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h1>{t.notFound.title}</h1>
      <span>{t.notFound.desc}</span>
      <GoToMainLink to={'/'}>{t.notFound.goToMain}</GoToMainLink>
    </NotFoundWrapper>
  )
}

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.navyblue};
  text-align: center;

  h1 {
    margin: 0;
    font-size: 36px;
  }

  span {
    font-size: 20px;
  }
`

const GoToMainLink = styled(Link)`
  color: ${({ theme }) => `${theme.colors.navyblue}60`};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
