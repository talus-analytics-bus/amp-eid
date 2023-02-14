import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import useIndexPageData from '../cmsHooks/useIndexPageData'
import NavBar from 'components/layout/NavBar/NavBar'
import { Link } from 'gatsby'

const ContentContainer = styled.div`
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
`
const Header = styled.header`
  text-align: center;
  max-width: 1000px;
  margin: auto;
  margin-top: 50px;
`
const IntroParagraph = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
`
const H1 = styled.h1`
  color: ${({ theme }) => theme.veryDarkGray};
  ${({ theme }) => theme.landingPageSmall};
  margin: 0;
  margin-bottom: 10px;
`
const H2 = styled.h2`
  ${({ theme }) => theme.landingPageH1};
  color: ${({ theme }) => theme.ampEidMedBlue};
  margin: 0;
  margin-bottom: 60px;
`
const TopicSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding-top: 60px;
  padding-bottom: 80px;
  background-color: ${({ theme }) => theme.veryLightGray};
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
  margin: 0;
  padding: 0;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`
const Li = styled.li`
  flex-basis: 30%;
  display: block;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 5px;
  overflow: hidden;
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
      <ContentContainer>
        <Header>
          <H1>
            <CMS.Text name="H2" data={cmsData} />
          </H1>
          <H2>
            <CMS.Text name="H1" data={cmsData} />
          </H2>
        </Header>
        <IntroParagraph>
          <CMS.Text name="Paragraph 1" data={cmsData} />
        </IntroParagraph>
      </ContentContainer>
      <TopicSection>
        <ContentContainer>
          <H3>
            <CMS.Text name="H3" data={cmsData} />
          </H3>
          <H4>
            <CMS.Text name="H4" data={cmsData} />
          </H4>
          <TopicLinkList>
            <Li>
              <ImageLink to="/topics/trips/">
                <CMS.Image name="Topic 1 image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Topic 1 text" data={cmsData} />
                </ImageLinkTextContainer>
              </ImageLink>
            </Li>
            <Li>
              <ComingSoonLinkPlaceholder>
                <CMS.Image name="Topic 2 image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Topic 2 text" data={cmsData} />
                </ImageLinkTextContainer>
              </ComingSoonLinkPlaceholder>
            </Li>
            <Li>
              <ComingSoonLinkPlaceholder>
                <CMS.Image name="Topic 3 image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Topic 3 text" data={cmsData} />
                </ImageLinkTextContainer>
              </ComingSoonLinkPlaceholder>
            </Li>
            <Li>
              <ComingSoonLinkPlaceholder>
                <CMS.Image name="Topic 4 image" data={cmsData} />
                <ImageLinkTextContainer>
                  <CMS.Text name="Topic 4 text" data={cmsData} />
                </ImageLinkTextContainer>
              </ComingSoonLinkPlaceholder>
            </Li>
          </TopicLinkList>
        </ContentContainer>
      </TopicSection>
      <ContentContainer>
        <H3>
          <CMS.Text name="H4" data={cmsData} />
        </H3>
        <H3>
          <CMS.Text name="H5" data={cmsData} />
        </H3>
      </ContentContainer>
    </Providers>
  )
}

export default IndexPage
