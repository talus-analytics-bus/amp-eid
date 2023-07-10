import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import AboutStyle from 'components/about/AboutStyle'
import Footer from 'components/layout/Footer'

import useAboutMethodPageData from 'cmsHooks/useAboutMethodData'
import useTopicMethods from 'queryHooks/useTopicMethods'

const MethodsPage = (): JSX.Element => {
  const cmsData = useAboutMethodPageData()
  const methods = useTopicMethods()

  return (
    <Providers>
      <CMS.SEO
        title="AMP EID Research Methods"
        description="Methods used to collect and analyze policies for the AMP EID database"
      />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <AboutStyle>
          <h1>
            <CMS.Text name="H1" data={cmsData} />
          </h1>
          <CMS.RichText name="Method overview" data={cmsData} />
          {methods.nodes.map(({ data: method }, index) => (
            <CMS.RenderRichText key={index} markdown={method?.Method ?? ''} />
          ))}
        </AboutStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default MethodsPage
