import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import Footer from 'components/layout/Footer'
import APIExplorer from 'components/about/api/APIExplorer'
import useDataAndAPIPageData from 'cmsHooks/useAboutDataAndAPIQuery'
import AboutStyle from 'components/about/AboutStyle'
import CSVDownloads from 'components/about/api/CSVDownloads/CSVDownloads'

const Citation = styled(CMS.RichText)`
  em {
    display: block;
    padding-left: 30px;
    padding-right: 30px;
  }
`

const APIPage = (): JSX.Element => {
  const cmsData = useDataAndAPIPageData()

  return (
    <Providers>
      <CMS.SEO
        title="AMP EID API"
        description="API and data access for the AMP EID database"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1" data={cmsData} />
          </h1>
          <CMS.RichText name="Top paragraph" data={cmsData} />
          <Citation name="Citation" data={cmsData} />
          <CSVDownloads />
          <h2>
            <CMS.Text name="H2 API documentation" data={cmsData} />
          </h2>
          <CMS.RichText name="API intro paragraph" data={cmsData} />
        </AboutStyle>
        <APIExplorer />
        <AboutStyle>
          <CMS.RichText name="Licensing" data={cmsData} />
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default APIPage
