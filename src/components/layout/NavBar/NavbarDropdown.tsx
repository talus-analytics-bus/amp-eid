import React from 'react'
import styled from 'styled-components'

import Dropdown from '@talus-analytics/library.ui.dropdown'

const Container = styled.div`
  position: relative;
`
const DropdownButton = styled.button<{ open: boolean }>`
  ${({ theme }) => theme.paragraph};
  border: none;
  background: none;
  color: ${({ theme }) => theme.white};
  padding: 14px;
  &:hover {
    color: ${({ theme }) => theme.ampEidMedLightBlue};
  }
  ${({ theme, open }) => open && `color: ${theme.ampEidMedLightBlue}`}
`
interface TopicsDropdownProps {
  title: React.ReactNode
  children: React.ReactNode
}

const NavbarDropdown = ({ title, children }: TopicsDropdownProps) => {
  return (
    <Container>
      <Dropdown
        hover
        animDuration={100}
        renderButton={open => (
          <DropdownButton open={open}>{title}</DropdownButton>
        )}
        expanderStyle={{ right: 0, top: 42, borderRadius: 5 }}
      >
        {children}
      </Dropdown>
    </Container>
  )
}

export default NavbarDropdown
