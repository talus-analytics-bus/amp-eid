import Dropdown from '@talus-analytics/library.ui.dropdown'
import React from 'react'
import styled from 'styled-components'

const DropdownButton = styled.button<{ open: boolean }>`
  background: none;
  border: none;
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.white};
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
  text-align: left;
  width: 100vw;

  &:hover {
    color: ${({ theme }) => theme.ampEidMedLightBlue};
    background-color: ${({ theme }) => theme.ampEidEvenDarkerBlue};
  }

  ${({ theme, open }) =>
    open && `background-color: ${theme.ampEidEvenDarkerBlue}`}
`
const DropdownContainer = styled.div`
  background-color: ${({ theme }) => theme.ampEidEvenDarkerBlue};
  color: ${({ theme }) => theme.white};
  padding-left: 20px;
`

interface MobileMenuDropdownProps {
  title: string
  children: React.ReactNode
}

const MobileMenuDropdown = ({ title, children }: MobileMenuDropdownProps) => (
  <Dropdown
    floating={false}
    renderButton={open => <DropdownButton open={open}>{title}</DropdownButton>}
  >
    <DropdownContainer>{children}</DropdownContainer>
  </Dropdown>
)

export default MobileMenuDropdown
