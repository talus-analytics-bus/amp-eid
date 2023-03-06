import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import NavBar from 'components/layout/NavBar/NavBar'
import CountrySearch from 'components/landing/CountrySearch'
import Footer from 'components/layout/Footer'
import Background from 'components/landing/Background'
import FirstFold from 'components/landing/FirstFold'
import HealthTopics from 'components/landing/HealthTopics'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import TreatySearch from 'components/landing/TreatySearch'

const ContentContainer = styled.div`
  position: relative;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
`
const H3 = styled.h3`
  margin: 0;
  margin-top: 80px;
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
`
const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }

  &:last-child {
    margin-bottom: 80px;
  }
`
const Column = styled.div`
  flex: 1;
`
const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.paragraph};
`

const IndexPage = (): JSX.Element => {
  const cmsData = useIndexPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Background />
      <FirstFold />
      <HealthTopics />
      <TreatySearch />
      <ContentContainer>
        <H3>
          <CMS.Text name="H5" data={cmsData} />
        </H3>
        <Columns>
          <Column>
            <Paragraph>
              <CMS.Text name="Paragraph 4" data={cmsData} />
            </Paragraph>
          </Column>
          <Column>
            <CountrySearch />
          </Column>
        </Columns>
      </ContentContainer>
      <Footer />
    </Providers>
  )
}

export default IndexPage
