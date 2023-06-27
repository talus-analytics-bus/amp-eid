import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import Footer from 'components/layout/Footer'
import useAboutDownloadAndCitationsPageData from 'cmsHooks/useAboutDownloadAndCitationsQuery'
import APIExplorer from 'components/about/api/APIExplorer'

export const APIParagraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  max-width: 1000px;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
`
const ItalicParagraph = styled.p`
  color: ${({ theme }) => theme.black};
  ${({ theme }) => theme.paragraph};
  font-style: italic;
  max-width: 970px;
  font-size: 20px;
  padding: 15px;
`
const H1 = styled.h1`
  ${({ theme }) => theme.h1}
  color: ${({ theme }) => theme.black};
`
const TextHeader2 = styled.h2`
  ${({ theme }) => theme.h2}
  color: ${({ theme }) => theme.black};
`
export const APIH2 = styled.h2`
  ${({ theme }) => theme.bigParagraph}
  color: ${({ theme }) => theme.black};
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
`

const APIPage = (): JSX.Element => {
  const cmsData = useAboutDownloadAndCitationsPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>
          <CMS.Text name="H2" data={cmsData} />
        </H1>
        <APIParagraph>
          <CMS.Text name="Bottom paragraph" data={cmsData} />
        </APIParagraph>
        <ItalicParagraph>
          <CMS.Text name="CGHSS paragraph" data={cmsData} />
        </ItalicParagraph>
        <APIParagraph>
          <CMS.Text name="Contact paragraph" data={cmsData} />
        </APIParagraph>
        <TextHeader2>API documentation</TextHeader2>
        <APIExplorer />
      </Main>
      <Footer />
    </Providers>
  )
}

export default APIPage
