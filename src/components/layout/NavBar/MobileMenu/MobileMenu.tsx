import React from 'react'
import styled from 'styled-components'

import Dropdown from '@talus-analytics/library.ui.dropdown'

import HamburgerButton from './HamburgerButton'

const MenuContainer = styled.div`
  @media (min-width: 1200px) {
    display: none;
  }
`
const MobileNavContainer = styled.div`
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow-y: scroll;
  padding-bottom: calc(30em + 20px);
  max-height: calc(100vh - 70px);
`
interface MobileMenuProps {
  children: React.ReactNode
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  return (
    <MenuContainer>
      <Dropdown
        expanderStyle={{
          width: '100vw',
          background: 'none',
          right: 0,
          marginTop: 15,
        }}
        renderButton={open => <HamburgerButton open={open} />}
      >
        <MobileNavContainer>{children}</MobileNavContainer>
      </Dropdown>
    </MenuContainer>
  )
}

export default MobileMenu
