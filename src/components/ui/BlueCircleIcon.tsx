import CMS, { CMSIconProps } from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.div<{ hideBG: boolean | undefined; bgColor: string }>`
  border-radius: 50%;

  background-color: ${({ bgColor, hideBG }) => !hideBG && bgColor};
  padding: ${({ hideBG }) => !hideBG && `calc(0.5% + 1px)`};
  flex-shrink: 0;
  position: relative;
  top: ${({ hideBG }) => !hideBG && `-0.04em`};
`

interface BlueCircleIconProps extends CMSIconProps {
  size: number
  hideBG?: boolean
  bgColor?: string
}

const BlueCircleIcon = (props: BlueCircleIconProps) => {
  const theme = useTheme()
  const { size, hideBG, bgColor = theme.option1Lighter, ...iconProps } = props
  return (
    <Container {...{ hideBG, bgColor }} style={{ width: size, height: size }}>
      <CMS.Icon color={theme.black} {...iconProps} />
    </Container>
  )
}

export default BlueCircleIcon
