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
  border: 1px solid ${({ theme }) => theme.veryLightGray};
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top: 0;
  border-right: 0;
`

interface MapBottomCornerModalProps {
  children: React.ReactNode
}

const MapBottomCornerModal = ({ children }: MapBottomCornerModalProps) => {
  return <Container>{children}</Container>
}

export default MapBottomCornerModal
