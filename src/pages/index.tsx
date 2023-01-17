import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import NavBar from 'components/layout/NavBar/NavBar'

const Header = styled.header`
  text-align: center;
  max-width: 1000px;
  margin: auto;
`
const IntroParagraph = styled.p`
  color: ${({ theme }) => theme.veryDarkGray};
  ${({ theme }) => theme.bigParagraph};
`
const H1 = styled.h1`
  color: ${({ theme }) => theme.ampEidDarkBlue};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 60px;
`
const H2 = styled.h2`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
`

const IndexPage = (): JSX.Element => {
  const data = useIndexPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <Header>
          <H2>
            <CMS.Text name="H2" data={data} />
          </H2>
          <H1>
            <CMS.Text name="H1" data={data} />
          </H1>
          <IntroParagraph>
            <CMS.Text name="Intro paragraph" data={data} />
          </IntroParagraph>
        </Header>
      </Main>
    </Providers>
  )
}

export default IndexPage
