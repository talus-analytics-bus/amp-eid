import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import NavBar from 'components/layout/NavBar/NavBar'
import Footer from 'components/layout/Footer'
import Background from 'components/landing/Background'
import FirstFold from 'components/landing/FirstFold'
import HealthTopics from 'components/landing/HealthTopics'
import TreatySearch from 'components/landing/TreatySearch'
import CountrySection from 'components/landing/CountrySection'

const IndexPage = (): JSX.Element => (
  <Providers>
    <CMS.SEO />
    <NavBar />
    <Background />
    <FirstFold />
    <HealthTopics />
    <TreatySearch />
    <CountrySection />
    <Footer />
  </Providers>
)

export default IndexPage
