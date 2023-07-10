import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'
import useUserGuidePageData from 'cmsHooks/useUserGuideQuery'

const MethodsPage = (): JSX.Element => {
  const cmsData = useUserGuidePageData()
  return (
    <Providers>
      <CMS.SEO
        title="AMP EID User Guide"
        description="User guide for the AMP EID site and database"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1" data={cmsData} />
          </h1>
          <CMS.RichText name="User guide text" data={cmsData} />
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default MethodsPage
