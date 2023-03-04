import CMS, { CMSIconProps } from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.div<{ hideBG: boolean | undefined }>`
  border-radius: 50%;

  background-color: ${({ theme, hideBG }) => !hideBG && theme.option1Lighter};
  padding: ${({ hideBG }) => !hideBG && `calc(0.5% + 1px)`};
  flex-shrink: 0;
  position: relative;
  top: ${({ hideBG }) => !hideBG && `-0.04em`};
`

interface BlueCircleIconProps extends CMSIconProps {
  size: number
  hideBG?: boolean
}

const BlueCircleIcon = (props: BlueCircleIconProps) => {
  const { size, hideBG, ...iconProps } = props
  const theme = useTheme()
  return (
    <Container hideBG={hideBG} style={{ width: size, height: size }}>
      <CMS.Icon color={theme.black} {...iconProps} />
    </Container>
  )
}

export default BlueCircleIcon
