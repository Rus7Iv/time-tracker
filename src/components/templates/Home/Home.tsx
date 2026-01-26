import styled from 'styled-components'

import { HomeHero } from '@/components/organisms/HomeHero/HomeHero'
import { HomeVisual } from '@/components/organisms/HomeVisual/HomeVisual'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import t from '@/i18n/locals'
import { media } from '@/media/media'

export const Home = () => {
  useDocumentTitle(t.common.appName)

  return (
    <MainLayout>
      <ContentWrapper>
        <HomeVisual />
        <HomeHero />
      </ContentWrapper>
    </MainLayout>
  )
}

const MainLayout = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 8vw, 100px);
  width: 100%;
  max-width: 1200px;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;

  ${media.isTablet} {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 15px;
    padding: 0 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
