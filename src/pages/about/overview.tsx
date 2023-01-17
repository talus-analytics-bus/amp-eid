import React from 'react'
import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewQuery'

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
        <p>
          <CMS.Text name="Top paragraph" data={cmsData} />
        </p>
      </Main>
    </Providers>
  )
}

export default OverviewPage
