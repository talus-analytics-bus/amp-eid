import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  background-color: #fff;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.25);
  padding: 20px;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.ampEidDarkBlue};
  border-radius: 5px;
`

interface MapBottomCornerModalProps {
  children: React.ReactNode
}

const MapBottomCornerModal = ({ children }: MapBottomCornerModalProps) => {
  return <Container>{children}</Container>
}

export default MapBottomCornerModal
