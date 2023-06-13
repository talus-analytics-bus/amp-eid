import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import PaginationControls from 'components/topics/ExplorePolicies/PaginationControls'

import formatAirtableDate from 'utilities/formatDate'
import StyledTable from 'components/ui/StyledTable'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'
import CSVDownloadLink from 'components/ui/CSVDownloadLink'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const SearchControlContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`
const Search = styled.input`
  ${({ theme }) => theme.smallParagraph};
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.medGray};
  border-radius: 5px;
  width: 40%;
  min-width: 300px;
`

export enum Status {
  Party = 'Party',
  Member = 'Member',
  Observer = 'Observer',
  Signatory = 'Signatory',
  'Non-party' = 'Non-party',
  'Associate Member' = 'Associate Member',
}

export const StatusPill = styled.span<{ status: Status }>`
  padding: 2px 10px;
  border-radius: 15px;
  background: ${({ theme, status }) =>
    ({
      [Status.Party]: theme.option3Lighter,
      [Status.Member]: theme.option1Lighter,
      [Status.Observer]: theme.option1Lighter,
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

  const [sortColumn, setSortColumn] = useState<{
    column: keyof CountryData
    reverse: boolean
  }>({ column: 'Country', reverse: false })

  const countries = [...countryList]

  const columns: ColumnTypeUnion<Exclude<keyof CountryData, ''>>[] = useMemo(
    () => [
      {
        displayName: 'Country',
        key: 'Country',
        render: val => {
          const countryName = val?.[0]?.data?.Country_name
          if (!countryName) return <></>
          if (countryName === 'European Union')
            return <span>{countryName}</span>
          return (
            <Link to={`/countries/${simplifyForUrl(countryName)}`}>
              {countryName}
            </Link>
          )
        },
        stringify: val => val?.[0]?.data?.Country_name ?? '',
        sort: (a, b) =>
          a?.[0]?.data?.Country_name?.localeCompare(
            b?.[0]?.data?.Country_name ?? ''
          ) ?? -1,
      },
      {
        displayName: 'Status',
        key: 'Status',
        render: val => (
          <StatusPill status={val as unknown as Status}>{val}</StatusPill>
        ),
        stringify: val => val ?? '',
        sort: (a, b) => {
          console.log({ a, b })
          return a && b ? a.localeCompare(b ?? '') : -1
        },
      },
      {
        displayName: 'Reservations, understandings, and declarations',
        key: 'Reservations__understandings__and_declarations',
        stringify: val => (val && val.join(', ')) ?? '',
        sort: (a, b) =>
          a && b ? a.join(', ').localeCompare(b.join(', ') ?? '') : -1,
      },
      {
        displayName: 'Reservations, understandings, and declarations text',
        key: 'RUDs_text',
        stringify: val => val ?? '',
        sort: (a, b) => (a && b ? a.localeCompare(b ?? '') : -1),
      },
      {
        displayName: 'Signed',
        key: 'Date_signed',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
        sort: (a, b) =>
          !a ? -1 : !b ? 1 : new Date(a).getTime() - new Date(b).getTime(),
      },
      {
        displayName: 'Ratified',
        key: 'Date_ratified',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
        sort: (a, b) =>
          !a ? -1 : !b ? 1 : new Date(a).getTime() - new Date(b).getTime(),
      },
      {
        displayName: 'Entered into force',
        key: 'Date_entered_into_force',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
        sort: (a, b) =>
          !a ? -1 : !b ? 1 : new Date(a).getTime() - new Date(b).getTime(),
      },
      {
        displayName: 'Reservations, understandings, and declarations',
        key: 'Reservations__understandings__and_declarations',
        stringify: val => (val && val.join(', ')) ?? '',
        sort: (a, b) =>
          a && b ? a.join(', ').localeCompare(b.join(', ') ?? '') : -1,
      },
      {
        displayName: 'Reservations, understandings, and declarations text',
        key: 'RUDs_text',
        stringify: val => val ?? '',
        sort: (a, b) => (a && b ? a.localeCompare(b ?? '') : -1),
      },
    ],
    []
  )

  let sorted: typeof countries

  const fuse = new Fuse(countries, {
    keys: [
      {
        name: 'name',
        getFn: country => country?.data?.Country?.[0]?.data?.Country_name ?? '',
      },
    ],
  })

  if (searchTerm === '') {
    const sortFunction = columns.find(
      col => col.key === sortColumn.column
    )?.sort

    sorted = sortFunction
      ? countries.sort((dataA, dataB) =>
          sortFunction(
            // @ts-expect-error: The types of a, b, and the
            // sort funtion are guaranteed by the types above
            dataA?.data?.[sortColumn.column],
            dataB?.data?.[sortColumn.column]
          )
        )
      : countries
    if (sortColumn.reverse) sorted = sorted.reverse()
  } else sorted = fuse.search(searchTerm).map(result => result.item)

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
    render?: (val: CountryData[T] | undefined) => React.ReactNode
    stringify: (val: CountryData[T] | undefined) => string
    sort?: (
      a: CountryData[T] | undefined,
      b: CountryData[T] | undefined
    ) => number
  }

  // create type to take keyos of CountryData and return Column<'key 1'> | Column<'key 2'>
  type ConvertToUnion<T> = T[keyof T]
  type ColumnTypeUnion<T extends keyof CountryData> = ConvertToUnion<{
    [key in T]: Column<key>
  }>

  const csvData = useMemo(
    () =>
      countryList.map(country => {
        const row: { [key: string]: string } = {}
        columns.forEach(
          column =>
            column.stringify &&
            (row[column.displayName] = column.stringify(
              // @ts-expect-error: The types of col.parse
              // and col.key are guaranteed by the types above
              country?.data?.[column.key]
            ))
        )
        return row
      }),
    [countryList, columns]
  )

  function isColumnKey(colKey: string): colKey is keyof CountryData {
    return Object.keys(countryList?.[0]?.data ?? {}).includes(colKey)
  }

  const handleColumnClick = (colKey: string) => {
    setPage(0)
    setSearchTerm('')

    if (!isColumnKey(colKey)) return

    setSortColumn(prev => {
      if (prev.column === colKey)
        return {
          column: colKey,
          reverse: !prev.reverse,
        }
      return {
        column: colKey,
        reverse: false,
      }
    })
  }

  return (
    <Container>
      <CSVDownloadLink
        label="Download states parties"
        data={csvData}
        filename={`AMP EID ${treatyData.data?.Document_name} states parties`}
        style={{ width: 'fit-content', marginBottom: 8 }}
      />
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
            {columns.map(
              col =>
                col.render && (
                  <th
                    onClick={() => handleColumnClick(col.key)}
                    key={col.displayName}
                  >
                    {col.displayName}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {paginated.map(country => (
            <tr key={country?.data?.Country?.[0]?.data?.Country_name}>
              {columns.map(
                col =>
                  col.render && (
                    <td key={col.displayName}>
                      {
                        // @ts-expect-error: The types of col.parse
                        // and col.key are guaranteed by the types above
                        col.render(country?.data?.[col.key])
                      }
                    </td>
                  )
              )}
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
