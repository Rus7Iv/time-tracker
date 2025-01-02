import styled from 'styled-components'

import {
  FooterNavItems,
  NavItems,
} from '@/components/molecules/NavItems/NavItems'

interface SidebarProps {
  $isExpanded: boolean
  onAction: () => void
}

const Sidebar = ({ $isExpanded, onAction }: SidebarProps) => {
  return (
    <StyledSidebar $isExpanded={$isExpanded}>
      <NavItems $isExpanded={$isExpanded} />
      <FooterNavItems $isExpanded={$isExpanded} onAction={onAction} />
    </StyledSidebar>
  )
}

export default Sidebar

interface StyledSidebarProps {
  $isExpanded: boolean
}

const StyledSidebar = styled.div<StyledSidebarProps>`
  color: white;
  width: ${({ $isExpanded }) => ($isExpanded ? '235px' : '64px')};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  overflow: hidden;
  z-index: 0;
`
