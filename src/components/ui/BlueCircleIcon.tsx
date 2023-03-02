import CMS, { CMSIconProps } from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.ampEidLightBlue};
  padding: calc(0.5% + 1px);
  flex-shrink: 0;
  position: relative;
  top: -0.04em;
`

interface BlueCircleIconProps extends CMSIconProps {
  size: number
}

const BlueCircleIcon = (props: BlueCircleIconProps) => {
  const { size, ...iconProps } = props
  const theme = useTheme()
  return (
    <Container style={{ width: size, height: size }}>
      <CMS.Icon color={theme.black} {...iconProps} />
    </Container>
  )
}

export default BlueCircleIcon
