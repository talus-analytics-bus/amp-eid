import CMS, { CMSIconProps } from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.div<{ hideBG: boolean | undefined; bgColor: string }>`
  background-color: ${({ bgColor, hideBG }) => !hideBG && bgColor};
  padding: ${({ hideBG }) => !hideBG && `calc(0.6% + 1px)`};
  top: ${({ hideBG }) => !hideBG && `-0.04em`};
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
`

interface BlueCircleIconProps extends CMSIconProps {
  /**
   * Size of the icon in pixels
   */
  size: number
  /**
   * Whether to hide the background circle
   */
  hideBG?: boolean
  /**
   * Background color of the circle
   */
  bgColor?: string
}

const BlueCircleIcon = (props: BlueCircleIconProps) => {
  const theme = useTheme()
  const { size, hideBG, bgColor = theme.option1Lighter, ...iconProps } = props
  return (
    <Container
      {...{ hideBG, bgColor }}
      style={{ width: size, height: size, ...props.style }}
    >
      <CMS.Icon color={theme.ampEidDarkBlue} {...iconProps} />
    </Container>
  )
}

export default BlueCircleIcon
