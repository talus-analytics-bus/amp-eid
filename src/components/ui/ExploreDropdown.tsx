import React from 'react'
import styled from 'styled-components'

import Dropdown, { DropdownProps } from '@talus-analytics/library.ui.dropdown'

const DropdownButton = styled.button`
  ${({ theme }) => theme.bigParagraphMedium};
  border: none;
  background: ${({ theme }) => theme.veryLightGray};
  color: ${({ theme }) => theme.black};
  margin: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
`
const DropdownContent = styled.div`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${({ theme }) => theme.veryLightGray};
`

interface ExploreDropdownProps extends Omit<DropdownProps, 'renderButton'> {
  label: React.ReactNode
}

const ExploreDropdown = ({
  label,
  children,
  ...props
}: ExploreDropdownProps) => (
  <Dropdown
    {...props}
    floating={false}
    renderButton={() => <DropdownButton>{label}</DropdownButton>}
  >
    <DropdownContent>{children}</DropdownContent>
  </Dropdown>
)

export default ExploreDropdown
