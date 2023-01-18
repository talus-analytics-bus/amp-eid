import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import NavBar from 'components/layout/NavBar/NavBar'
import { Link } from 'gatsby'

const Header = styled.header`
  text-align: center;
  max-width: 1000px;
  margin: auto;
`
const IntroParagraph = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
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
  display: flex;
  gap: 30px;
`
const Li = styled.li`
  flex-basis: 30%;
  display: block;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 5px;
`
const ImageLink = styled(Link)`
  display: block;
  position: relative;
  background: white;
  transition: 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.lightGray};
  }
`
const ComingSoonLinkPlaceholder = styled.span`
  display: block;
  position: relative;
`
const ImageLinkTextContainer = styled.div`
  ${({ theme }) => theme.bigParagraph};
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.black};
  background: rgba(255, 255, 255, 0.85);
  border-radius: 5px;
`

const IndexPage = (): JSX.Element => {
  const cmsData = useIndexPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <Header>
          <H2>
            <CMS.Text name="H2" data={cmsData} />
          </H2>
          <H1>
            <CMS.Text name="H1" data={cmsData} />
          </H1>
          <IntroParagraph>
            <CMS.Text name="Intro paragraph" data={cmsData} />
          </IntroParagraph>
        </Header>
        <TopicSection>
          <H3>
            <CMS.Text name="H3" data={cmsData} />
          </H3>
          <H4>
            <CMS.Text name="H4" data={cmsData} />
          </H4>
          <TopicLinkList>
            <Li>
              <ImageLink to="/topics/trips/">
                <CMS.Image name="TRIPS image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="TRIPS text" data={cmsData} />
                </ImageLinkTextContainer>
              </ImageLink>
            </Li>
            <Li>
              <ComingSoonLinkPlaceholder>
                <CMS.Image name="Childhood vaccination image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Childhood vaccination text" data={cmsData} />
                </ImageLinkTextContainer>
              </ComingSoonLinkPlaceholder>
            </Li>
            <Li>
              <ComingSoonLinkPlaceholder>
                <CMS.Image name="Non-human vaccination image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Non-human vaccination text" data={cmsData} />
                </ImageLinkTextContainer>
              </ComingSoonLinkPlaceholder>
            </Li>
          </TopicLinkList>
        </TopicSection>
      </Main>
    </Providers>
  )
}

export default IndexPage
