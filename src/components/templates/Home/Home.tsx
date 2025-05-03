import styled from 'styled-components'

import { ReactComponent as PartyPopper } from '@/assets/icons/partyPopper.svg'
import { StartButton } from '@/components/atoms/Buttons'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export const Home = () => {
  useDocumentTitle('TimeTracker')

  return (
    <MainLayout>
      <StartText>Начнём?</StartText>
      <ContentContainer>
        <LeftContainer>
          <StartButton />
        </LeftContainer>
      </ContentContainer>
      <StyledPartyPopper />
    </MainLayout>
  )
}

const MainLayout = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 1;
`

const LeftContainer = styled.div`
  display: flex;
  transform: translateX(-40%);
  align-items: center;
`

const StartText = styled.h1`
  margin: 0 30px 0 30px;
  text-align: center;
  font-size: 50px;

  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%) translateX(-10%);
  width: 40%;
  height: auto;
  max-height: 300px;
`

const StyledPartyPopper = styled(PartyPopper)`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 40%;
  height: auto;
  max-height: 300px;
`
