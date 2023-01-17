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
  color: ${({ theme }) => theme.ampEidGreen};
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
const TopicSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`
const H3 = styled.h3`
  margin: 0;
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
`
const H4 = styled.h4`
  margin: 0;
  margin-top: 5px;
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.veryDarkGray};
`
const TopicLinkList = styled.ul`
  list-style: none;
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
        <TopicSection>
          <H3>
            <CMS.Text name="H3" data={data} />
          </H3>
          <H4>
            <CMS.Text name="H4" data={data} />
          </H4>
        </TopicSection>
      </Main>
    </Providers>
  )
}

export default IndexPage
