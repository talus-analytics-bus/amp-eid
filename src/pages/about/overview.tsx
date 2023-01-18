import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewQuery'

const Paragraph = styled.p`
  max-width: 1000px;
`

const FunderImage = styled(CMS.Image)`
  width: 633px;
`

const GUImage = styled(CMS.Image)`
  max-width: 735px;
`

const OverviewPage = (): JSX.Element => {
  const cmsData = useAboutOverviewPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <AboutNav />
        <h1>
          <CMS.Text name="H1" data={cmsData} />
        </h1>
        <Paragraph>
          <CMS.Text name="Top paragraph" data={cmsData} />
        </Paragraph>
        <h1>
          <CMS.Text name="H2" data={cmsData} />
        </h1>
        <FunderImage name="Funder icon" data={cmsData} />
        <Paragraph>
          <CMS.Text name="Funder paragraph" data={cmsData} />
        </Paragraph>
        <h1>
          <CMS.Text name="H2 contributors" data={cmsData} />
        </h1>
        <GUImage name="Contributors icon" data={cmsData} />
        <Paragraph>
          <CMS.Text name="Contributors paragraph" data={cmsData} />
        </Paragraph>
      </Main>
    </Providers>
  )
}

export default OverviewPage
