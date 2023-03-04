import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import TopicList from './TopicList'
import useIndexPageData from 'cmsHooks/useIndexPageData'

const BackgroundContainer = styled.div`
  background-color: ${({ theme }) => theme.ampEidEvenDarkerBlue};
  padding-top: 40px;
`
const ContentContainer = styled.div`
  position: relative;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  padding: 80px 30px;
`
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`
const H3 = styled.h3`
  margin: 0;
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.white};
`
const Paragraph = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.white};
  text-align: center;
  max-width: 900px;
  margin: 0;
`

const HealthTopics = (): JSX.Element => {
  const cmsData = useIndexPageData()

  return (
    <BackgroundContainer id="topics">
      <ContentContainer>
        <SectionHeader>
          <H3>
            <CMS.Text name="H3" data={cmsData} />
          </H3>
          <Paragraph>
            <CMS.Text name="Paragraph 2" data={cmsData} />
          </Paragraph>
          <TopicList />
        </SectionHeader>
      </ContentContainer>
    </BackgroundContainer>
  )
}

export default HealthTopics
