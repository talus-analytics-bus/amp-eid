import React from 'react'
import styled from 'styled-components'

import Dropdown, { DropdownProps } from '@talus-analytics/library.ui.dropdown'

const DropdownButton = styled.button<{ open: boolean; animDuration: number }>`
  ${({ theme }) => theme.h4};
  border: none;
  background: ${({ theme, open }) =>
    open ? theme.lightGray : theme.veryLightGray};

  &:hover {
    background: ${({ theme }) => theme.lightGray};
  }

  color: ${({ theme }) => theme.black};
  margin: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  ${({ open }) =>
    open &&
    `
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
  `}
  display: flex;
  align-items: center;
  gap: 15px;
  transition: ${({ animDuration }) => animDuration}ms;
  text-align: left;
`
const DropdownContent = styled.div`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${({ theme }) => theme.lightGray};
`

interface ExploreDropdownProps extends Omit<DropdownProps, 'renderButton'> {
  label: React.ReactNode
  style?: React.CSSProperties
}

const ExploreDropdown = ({
  label,
  children,
  style,
  ...props
}: ExploreDropdownProps) => (
  <div style={style}>
    <Dropdown
      {...props}
      floating={false}
      renderWhileClosed
      renderButton={(open, animDuration) => (
        <DropdownButton open={open} animDuration={animDuration}>
          {label}
        </DropdownButton>
      )}
    >
      <DropdownContent>{children}</DropdownContent>
    </Dropdown>
  </div>
)

export default ExploreDropdown
