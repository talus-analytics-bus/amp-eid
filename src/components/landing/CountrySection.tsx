import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import CountrySearch from './CountrySearch'

import useIndexPageData from 'cmsHooks/useIndexPageData'

const ContentContainer = styled.div`
  position: relative;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const H3 = styled.h3`
  margin: 80px 0 30px 0;
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.ampEidDarkBlue};
`
const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.paragraph};
  text-align: center;
  margin: 30px 0 50px 0;
`
const SearchBarContainer = styled.div`
  max-width: 450px;
  width: 100%;
  margin-bottom: 240px;
`

const CountrySection = () => {
  const cmsData = useIndexPageData()

  return (
    <ContentContainer id="countries">
      <H3>
        <CMS.Text name="H5" data={cmsData} />
      </H3>
      <Paragraph>
        <CMS.Text name="Paragraph 4" data={cmsData} />
      </Paragraph>
      <SearchBarContainer>
        <CountrySearch />
      </SearchBarContainer>
    </ContentContainer>
  )
}

export default CountrySection
