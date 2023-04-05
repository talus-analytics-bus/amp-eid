import React from 'react'
import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import styled from 'styled-components'

import useAboutDownloadAndCitationsPageData from 'cmsHooks/useAboutDownloadAndCitationsQuery'
import Footer from 'components/layout/Footer'

const Paragraph = styled.p`
  color: ${({ theme }) => theme.black};
  ${({ theme }) => theme.paragraph};
  max-width: 1000px;
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

const H2 = styled.h2`
  ${({ theme }) => theme.h2}
  color: ${({ theme }) => theme.black};
`

const DownloadsPage = (): JSX.Element => {
  const cmsData = useAboutDownloadAndCitationsPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>
          <CMS.Text name="H1" data={cmsData} />
        </H1>
        <Paragraph>
          <CMS.Text name="Top paragraph" data={cmsData} />
        </Paragraph>
        <H2>
          <CMS.Text name="H2" data={cmsData} />
        </H2>
        <Paragraph>
          <CMS.Text name="Bottom paragraph" data={cmsData} />
        </Paragraph>
        <ItalicParagraph>
          <CMS.Text name="CGHSS paragraph" data={cmsData} />
        </ItalicParagraph>
        <Paragraph>
          <CMS.Text name="Contact paragraph" data={cmsData} />
        </Paragraph>
        <Paragraph>
          <CMS.Text name="Tools paragraph" data={cmsData} />
        </Paragraph>
        <Paragraph>
          <CMS.Text name="Downloads paragraph" data={cmsData} />
        </Paragraph>
      </Main>
      <Footer />
    </Providers>
  )
}

export default DownloadsPage
