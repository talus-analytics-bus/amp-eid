import React from 'react'
import styled, { useTheme } from 'styled-components'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import CMS from '@talus-analytics/library.airtable-cms'
import { Link } from 'gatsby'

const Container = styled.div`
  position: relative;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 80px;
`
const Header = styled.header`
  text-align: center;
  max-width: 1000px;
  margin: auto;
  margin-top: 200px;
`
const H1 = styled.h1`
  color: ${({ theme }) => theme.veryDarkGray};
  ${({ theme }) => theme.landingPageSmall};
  margin-bottom: 10px;
  margin: 0;
`
const H2 = styled.h2`
  ${({ theme }) => theme.landingPageH1};
  color: ${({ theme }) => theme.ampEidDarkBlue};
  margin-bottom: 60px;
  margin: 0;
`
const IntroParagraph = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
  text-align: center;
  margin-top: 60px;
`
const JumpLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const JumpLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  text-decoration: none;
  color: ${({ theme }) => theme.ampEidDarkBlue};
  ${({ theme }) => theme.h2};
  gap: 20px;
  padding: 30px;
  width: 200px;
  transition: 250ms;
  border-radius: 5px;
  background-color: white;

  &:hover {
    background-color: ${({ theme }) => theme.veryLightGray};
    transition: 100ms;
  }
`
const Icon = styled(CMS.Icon)`
  height: 45px;
`

const FirstFold = () => {
  const cmsData = useIndexPageData()
  const theme = useTheme()

  return (
    <Container>
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
      <JumpLinks>
        <JumpLink to="#topics">
          <Icon name="Topic" color={theme.ampEidDarkBlue} />
          Topics
        </JumpLink>
        <JumpLink to="#treaties">
          <Icon name="Treaty" color={theme.ampEidDarkBlue} />
          Treaties
        </JumpLink>
        <JumpLink to="#countries">
          <Icon name="Country" color={theme.ampEidDarkBlue} />
          Countries
        </JumpLink>
      </JumpLinks>
    </Container>
  )
}
export default FirstFold
