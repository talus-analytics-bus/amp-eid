import React, { useMemo, useState } from 'react'

import Typeahead from '@talus-analytics/library.ui.typeahead'

import useCountryNames from 'queryHooks/useCountryNames'
import { navigate } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'
import styled, { useTheme } from 'styled-components'

interface CoutnrySearchProps {
  style?: React.CSSProperties
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 0 15px;
`

const CountrySearch = ({ style }: CoutnrySearchProps) => {
  const countries = useCountryNames()
  const theme = useTheme()

  const searchItems = useMemo(
    () =>
      countries.nodes
        .map(country => {
          if (!country.data?.ISO3 || !country.data.Country_name)
            throw new Error('Country name or ISO3 not found')

          return {
            key: country?.data?.ISO3,
            label: country.data?.Country_name,
          }
        })
        .sort((a, b) => a.label.localeCompare(b.label)),
    [countries]
  )

  return (
    <Container>
      <Typeahead
        iconLeft
        multiselect
        style={style}
        backgroundColor={theme.white}
        borderColor={theme.ampEidEvenDarkerBlue}
        fontColor={theme.black}
        items={searchItems}
        placeholder={`Search for a country`}
        onAdd={item => navigate(`/countries/${simplifyForUrl(item.label)}`)}
        iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23192C3C'/%3E%3C/svg%3E%0A`}
      />
    </Container>
  )
}

export default CountrySearch
