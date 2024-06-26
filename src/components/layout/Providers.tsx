import React from 'react'

import { createGlobalStyle, ThemeProvider } from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import textStyles from 'figma/textStyles'
import colorPalette from 'figma/colorPalette'

import useIconsQuery from 'cmsHooks/useIconsQuery'
import useSiteMetadataQuery from 'cmsHooks/useSiteMetadataQuery'
import getTrackingId from 'utilities/trackingId'

import '../../../static/assets/fonts/fonts.css'

// typescript really strict mode
import '@total-typescript/ts-reset'
import ModalMessageProvider from 'components/ui/Modal/ModalMessageProvider'

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.black};
    ${({ theme }) => theme.paragraph};
  }
  * {
    box-sizing: border-box;
  }
`

// site-wide contexts for themes, icons, and metadata
const Providers = ({ children }: { children: React.ReactNode }) => {
  const icons = useIconsQuery()
  const siteMetadata = useSiteMetadataQuery()
  // get GA tracking ID
  const trackingId = getTrackingId()

  return (
    <CMS.IconProvider data={icons}>
      <CMS.SiteMetadataProvider data={siteMetadata} trackingId={trackingId}>
        <ThemeProvider theme={{ ...textStyles, ...colorPalette }}>
          <ModalMessageProvider>
            <GlobalStyle />
            {children}
          </ModalMessageProvider>
        </ThemeProvider>
      </CMS.SiteMetadataProvider>
    </CMS.IconProvider>
  )
}

export default Providers
