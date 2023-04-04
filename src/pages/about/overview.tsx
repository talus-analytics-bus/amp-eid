import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import useAboutOverviewPageData from 'cmsHooks/useAboutOverviewQuery'

const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  max-width: 1000px;
`
const MainTextSection = styled(CMS.RichText)`
  > p {
    ${({ theme }) => theme.paragraph};
    color: ${({ theme }) => theme.black};
    max-width: 1000px;
  }
`
const H1 = styled.h1`
  ${({ theme }) => theme.h1}
  color: ${({ theme }) => theme.black};
`
const H2 = styled.h2`
  ${({ theme }) => theme.h2}
  color: ${({ theme }) => theme.black};
`
const FunderImage = styled(CMS.Image)`
  max-width: 633px;
`
const GUImage = styled(CMS.Image)`
  max-width: 735px;
`

const OverviewPage = (): JSX.Element => {
  const cmsData = useAboutOverviewPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>
          <CMS.Text name="H1" data={cmsData} />
        </H1>
        <MainTextSection name="Main content" data={cmsData} />
        <H2>
          <CMS.Text name="H2 funder" data={cmsData} />
        </H2>
        <FunderImage
          imgStyle={{ objectFit: 'contain' }}
          name="Funder icon"
          data={cmsData}
        />
        <Paragraph>
          <CMS.Text name="Funder paragraph" data={cmsData} />
        </Paragraph>
        <H2>
          <CMS.Text name="H2 contributors" data={cmsData} />
        </H2>
        <GUImage
          imgStyle={{ objectFit: 'contain' }}
          name="Contributors icon"
          data={cmsData}
        />
        <Paragraph>
          <CMS.Text name="Contributors paragraph" data={cmsData} />
        </Paragraph>
      </Main>
    </Providers>
  )
}

export default OverviewPage
