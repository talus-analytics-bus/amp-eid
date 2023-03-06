import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutMethodPageData from 'cmsHooks/useAboutMethodData'

const Overview = styled(CMS.RichText)`
  > h2 {
    ${({ theme }) => theme.h2};
    color: ${({ theme }) => theme.ampEidMedBlue};
  }
  > h3 {
    ${({ theme }) => theme.bigParagraphMedium};
    color: ${({ theme }) => theme.black};
  }
  > p {
    ${({ theme }) => theme.bigParagraph};
    color: ${({ theme }) => theme.black};
  }
`

const MethodsPage = (): JSX.Element => {
  const cmsData = useAboutMethodPageData()
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <AboutNav />
        <h1>
          <CMS.Text name="H1" data={cmsData} />
        </h1>
        <Overview name="Method overview" data={cmsData} />
      </Main>
    </Providers>
  )
}

export default MethodsPage
