import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import Footer from 'components/layout/Footer'
import APIExplorer from 'components/about/api/APIExplorer'
import useDataAndAPIPageData from 'cmsHooks/useAboutDataAndAPIQuery'

const CMSContentStyle = styled.div`
  h1 {
    ${({ theme }) => theme.h1};
    color: ${({ theme }) => theme.black};
  }

  h2 {
    ${({ theme }) => theme.h2};
    color: ${({ theme }) => theme.ampEidMedBlue};
    padding: 30px 0 0 0;
    border-top: 3px solid ${({ theme }) => theme.lightGray};
    margin-top: 30px;
  }

  em {
    display: block;
    padding-left: 30px;
    padding-right: 30px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.link};

    &:hover {
      text-decoration: underline;
    }
  }
`

const APIPage = (): JSX.Element => {
  const cmsData = useDataAndAPIPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <CMSContentStyle>
          <h1>
            <CMS.Text name="H1" data={cmsData} />
          </h1>
          <CMS.RichText name="Top paragraph" data={cmsData} />
          <CMS.RichText name="Citation" data={cmsData} />
          <h2>
            <CMS.Text name="H2 API documentation" data={cmsData} />
          </h2>
          <CMS.RichText name="API intro paragraph" data={cmsData} />
        </CMSContentStyle>
        <APIExplorer />
        <CMSContentStyle>
          <CMS.RichText name="Licensing" data={cmsData} />
        </CMSContentStyle>
      </Main>
      <Footer />
    </Providers>
  )
}

export default APIPage
