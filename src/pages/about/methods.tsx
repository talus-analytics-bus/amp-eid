import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutMethodPageData from 'cmsHooks/useAboutMethodData'
import { AboutStyle, H1 } from 'components/about/AboutStyle'

const MethodsPage = (): JSX.Element => {
  const cmsData = useAboutMethodPageData()
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>
          <CMS.Text name="H1" data={cmsData} />
        </H1>
        <AboutStyle name="Method overview" data={cmsData} />
      </Main>
    </Providers>
  )
}

export default MethodsPage
