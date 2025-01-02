import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NotFound = () => {
  const title = 'Упс...'
  const desc = 'Похоже, что такой страницы не существует'
  const goToMain = 'Вернуться на главную'

  return (
    <NotFoundWrapper>
      <h1>{title}</h1>
      <span>{desc}</span>
      <GoToMainLink to={'/'}>{goToMain}</GoToMainLink>
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
