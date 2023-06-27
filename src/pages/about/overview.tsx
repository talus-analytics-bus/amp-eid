import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewQuery'
import Footer from 'components/layout/Footer'
import AboutStyle from 'components/about/AboutStyle'

const FunderImage = styled(CMS.Image)`
  max-width: 633px;
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
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1" data={cmsData} />
          </h1>
          <CMS.RichText name="Main content" data={cmsData} />
          <h2>
            <CMS.Text name="H2 funder" data={cmsData} />
          </h2>
          <FunderImage
            imgStyle={{ objectFit: 'contain' }}
            name="Funder icon"
            data={cmsData}
          />
          <p>
            <CMS.Text name="Funder paragraph" data={cmsData} />
          </p>
          <h2>
            <CMS.Text name="H2 contributors" data={cmsData} />
          </h2>
          <GUImage
            imgStyle={{ objectFit: 'contain' }}
            name="Contributors icon"
            data={cmsData}
          />
          <p>
            <CMS.Text name="Contributors paragraph" data={cmsData} />
          </p>
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default OverviewPage
