import React, { useMemo } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'
import Typeahead from '@talus-analytics/library.ui.typeahead'

import useShortTreatyNames from 'queryHooks/useShortTreatyNames'
import useIndexPageData from 'cmsHooks/useIndexPageData'

import simplifyForUrl from 'utilities/simplifyForUrl'

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

const TreatySearch = () => {
  const treatyNames = useShortTreatyNames()
  const cmsData = useIndexPageData()

  const searchItems = useMemo(
    () =>
      treatyNames
        .map(name => ({ key: name, label: name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [treatyNames]
  )

  return (
    <ContentContainer id="treaties">
      <H3>
        <CMS.Text name="H4" data={cmsData} />
      </H3>
      <Paragraph>
        <CMS.Text name="Paragraph 3" data={cmsData} />
      </Paragraph>
      <Typeahead
        style={{ minWidth: 450 }}
        iconLeft
        items={searchItems}
        placeholder={`Search`}
        onAdd={item => navigate(`/treaties/${simplifyForUrl(item.key)}`)}
        iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23757C85'/%3E%3C/svg%3E%0A`}
      />
    </ContentContainer>
  )
}

export default TreatySearch
