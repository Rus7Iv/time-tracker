import styled from 'styled-components'

import { media } from '../../../media/media'
import { useMedia } from '../../../media/useMedia'
import useHeaderStore from '../../../store/headerStore'
import useSidebarStore from '../../../store/sidebarStore'
import { Header } from '../../organisms/Header/Header'
import Sidebar from '../../organisms/Sidebar/Sidebar'

interface IBaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: IBaseLayoutProps) => {
  const { isExpanded: isSidebarExpanded, toggleSidebar } = useSidebarStore()
  const { isExpanded: isHeaderExpanded } = useHeaderStore()
  const { isMobile } = useMedia()

  return (
    <PageContainer>
      <Header />
      <MainContainer>
        {!isMobile && (
          <Sidebar $isExpanded={isSidebarExpanded} onAction={toggleSidebar} />
        )}
        <Content $isHeaderExpanded={isHeaderExpanded}>{children}</Content>
      </MainContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.palegray};
`

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`

const Content = styled.div<{ $isHeaderExpanded: boolean }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cream};
  padding: 35px;
  transition:
    margin-left 0.3s ease,
    max-height 0.3s ease;
  z-index: 1;
  margin: 0 40px 40px 0;
  border-radius: 48px;
  box-sizing: border-box;

  ${media.isTablet} {
    margin: 0 24px 24px 0;
    padding: 24px;
    max-height: calc(100vh - 114px);
    overflow-y: auto;
    border-radius: 30px;
  }

  ${media.isMobile} {
    margin: 8px;
    margin-top: 0;
    max-height: ${({ $isHeaderExpanded }) =>
      $isHeaderExpanded ? 'calc(100vh - 215px)' : 'calc(100vh - 78px)'};
  }
`
