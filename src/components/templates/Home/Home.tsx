import styled from 'styled-components'

import { ReactComponent as PartyPopper } from '@/assets/icons/partyPopper.svg'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export const Home = () => {
  useDocumentTitle('TimeTracker')

  return (
    <MainLayout>
      <ContentContainer>
        <LeftContainer>
          <StartText>Начнём?</StartText>
          <StartButton>
            <Triangle />
          </StartButton>
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
`

const StartButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff38a9 0%, #f422a7 100%);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(244, 34, 167, 0.4);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(244, 34, 167, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 1;
  }
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  margin-left: 5px;
`

const StyledPartyPopper = styled(PartyPopper)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40%;
  height: auto;
  max-height: 400px;
`
