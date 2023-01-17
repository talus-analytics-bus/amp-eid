import React from 'react'
import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'

const MethodsPage = (): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <AboutNav />
        <h1>Methods</h1>
      </Main>
    </Providers>
  )
}

export default MethodsPage
