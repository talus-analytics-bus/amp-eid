import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import useIndexPageData from 'cmsHooks/useIndexPageData'

const TopicLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
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

const TopicList = () => {
  const cmsData = useIndexPageData()

  return (
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
  )
}

export default TopicList
