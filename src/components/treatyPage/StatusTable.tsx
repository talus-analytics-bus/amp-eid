import React, { useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import PaginationControls from 'components/topics/ExplorePolicies/PaginationControls'

import formatAirtableDate from 'utilities/formatDate'
import StyledTable from 'components/ui/StyledTable'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const SearchControlContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Search = styled.input`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 5px;
`

enum Status {
  Party = 'Party',
  Member = 'Member',
  Observer = 'Observer',
  Signatory = 'Signatory',
  'Non-party' = 'Non-party',
  'Associate Member' = 'Associate Member',
}

const StatusPill = styled.span<{ status: Status }>`
  padding: 2px 10px;
  border-radius: 15px;
  background: ${({ theme, status }) =>
    ({
      [Status.Party]: theme.option3Lighter,
      [Status.Member]: theme.option1Lighter,
      [Status.Observer]: theme.option5Lighter,
      [Status.Signatory]: theme.option4Lighter,
      [Status['Non-party']]: theme.option5Lighter,
      [Status['Associate Member']]: theme.option2Lighter,
    }[status] ?? theme.veryLightGray)};
`

const StatusTable = ({
  treatyData,
}: {
  treatyData: Exclude<Queries.TreatyPageQuery['treaty'], null>
}) => {
  const countryList = treatyData.data?.Treaty_status
  if (!countryList || countryList.length === 0 || !countryList[0]?.data)
    throw new Error(
      `Country list not found for treaty ${treatyData.data?.Document_name}`
    )

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  type Writeable<T> = { -readonly [P in keyof T]: T[P] }
  type countriesMutable = Writeable<typeof countryList>
  const countries = countryList as unknown as countriesMutable

  let sorted: typeof countries

  const fuse = new Fuse(countries, {
    keys: [
      {
        name: 'name',
        getFn: country => country?.data?.Country?.[0]?.data?.Country_name ?? '',
      },
    ],
  })

  if (searchTerm === '')
    sorted = countries.sort(
      (a, b) =>
        a?.data?.Country?.[0]?.data?.Country_name?.localeCompare(
          b?.data?.Country?.[0]?.data?.Country_name ?? ''
        ) ?? -1
    )
  else sorted = fuse.search(searchTerm).map(result => result.item)

  const total = sorted.length
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize)

  type CountryData = Exclude<
    [Exclude<typeof countryList[number], null>][number]['data'],
    null
  >

  // This approach adapted from:
  // https://stackoverflow.com/questions/50870423/discriminated-union-of-generic-type
  interface Column<T extends keyof CountryData> {
    key: T
    displayName: string
    parse: (val: CountryData[T] | undefined) => React.ReactNode
  }

  // create type to take keyos of CountryData and return Column<'key 1'> | Column<'key 2'>
  type ConvertToUnion<T> = T[keyof T]
  type ColumnTypeUnion<T extends keyof CountryData> = ConvertToUnion<{
    [key in T]: Column<key>
  }>

  const columns: ColumnTypeUnion<Exclude<keyof CountryData, ''>>[] = [
    {
      displayName: 'Country',
      key: 'Country',
      parse: val =>
        val?.[0]?.data?.Country_name && (
          <Link to={`/countries/${simplifyForUrl(val[0].data.Country_name)}`}>
            {val[0].data.Country_name}
          </Link>
        ),
    },
    {
      displayName: 'Status',
      key: 'Status',
      parse: val => (
        <StatusPill status={val as unknown as Status}>{val}</StatusPill>
      ),
    },
    {
      displayName: 'Signed',
      key: 'Date_signed',
      parse: val => (val ? formatAirtableDate(val) : ''),
    },
    {
      displayName: 'Ratified',
      key: 'Date_ratified',
      parse: val => (val ? formatAirtableDate(val) : ''),
    },
    {
      displayName: 'Became a party',
      key: 'Date_became_a_party',
      parse: val => (val ? formatAirtableDate(val) : ''),
    },
  ]

  return (
    <Container>
      <SearchControlContainer>
        <Search
          type="search"
          placeholder="Find a country"
          value={searchTerm}
          onChange={e => {
            setPage(0)
            setSearchTerm(e.target.value)
          }}
        />
      </SearchControlContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.displayName}>{col.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map(country => (
            <tr key={country?.data?.Country?.[0]?.data?.Country_name}>
              {columns.map(col => (
                // @ts-expect-error: The types of col.parse
                // and col.key are guaranteed by the types above
                <td key={col.key}>{col.parse(country?.data?.[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <PaginationControls
        {...{ page, setPage, pageSize, setPageSize, total }}
      />
    </Container>
  )
}

export default StatusTable
