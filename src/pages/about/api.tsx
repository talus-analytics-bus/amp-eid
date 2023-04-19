import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewQuery'
import Footer from 'components/layout/Footer'

const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  max-width: 1000px;
`
const H1 = styled.h1`
  ${({ theme }) => theme.h1}
  color: ${({ theme }) => theme.black};
`
const H2 = styled.h2`
  ${({ theme }) => theme.h2}
  color: ${({ theme }) => theme.black};
`

const apiDefinitions = [
  {
    name: 'Download All Data',
    route: '/api/v1/',
    description: 'Download all data in JSON format',
    example: 'curl https://ampeid.org/api/v1/',
  },
]

const OverviewPage = (): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>AMP-EID API Documentation</H1>
        <Paragraph>
          Full AMP-EID data can be downloaded in machine-readable JSON format
          here:
        </Paragraph>
        <a href="/api/data.json">ampeid.org/api/data.json</a>
      </Main>
      <Footer />
    </Providers>
  )
}

export default OverviewPage
