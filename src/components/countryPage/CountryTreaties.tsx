import StyledTable from 'components/ui/StyledTable'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import formatAirtableDate from 'utilities/formatDate'
import simplifyForUrl from 'utilities/simplifyForUrl'

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

interface CountryTreatiesProps {
  countryName: string
  // prettier-ignore
  treaties:
    Exclude<
      Exclude<
        Queries.CountryPageQuery['countryData'], null
      >['data'], null
    >['Country_treaty_status_link']
}

const CountryTreaties = ({ countryName, treaties }: CountryTreatiesProps) => {
  if (!treaties || treaties.length === 0)
    throw new Error(`Treaties not found for ${countryName}`)

  type TreatyData = Exclude<
    [Exclude<(typeof treaties)[number], null>][number]['data'],
    null
  >

  type Writeable<T> = { -readonly [P in keyof T]: T[P] }

  const readTreaties = treaties as Writeable<typeof treaties>

  const sortedTreaties = readTreaties.sort(
    (a, b) =>
      a?.data?.Treaty_name?.[0]?.data?.Treaty_short_name?.localeCompare(
        b?.data?.Treaty_name?.[0]?.data?.Treaty_short_name ?? ''
      ) ?? -1
  )

  // This approach adapted from:
  // https://stackoverflow.com/questions/50870423/discriminated-union-of-generic-type
  interface Column<T extends keyof TreatyData> {
    key: T
    displayName: string
    parse: (val: TreatyData[T] | undefined) => React.ReactNode
  }

  // create type to take keyos of CountryData and return Column<'key 1'> | Column<'key 2'>
  type ConvertToUnion<T> = T[keyof T]
  type ColumnTypeUnion<T extends keyof TreatyData> = ConvertToUnion<{
    [key in T]: Column<key>
  }>

  const columns: ColumnTypeUnion<Exclude<keyof TreatyData, ''>>[] = [
    {
      displayName: 'Treaty',
      key: 'Treaty_name',
      parse: val => (
        <Link
          to={`/treaties/${simplifyForUrl(
            val?.[0]?.data?.Treaty_short_name ?? '#'
          )}`}
        >
          {val?.[0]?.data?.Treaty_short_name}
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
      displayName: 'Entered into force',
      key: 'Date_entered_into_force',
      parse: val => (val ? formatAirtableDate(val) : ''),
    },
  ]

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.displayName}>{col.displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedTreaties.map(treaty => (
          <tr key={treaty?.data?.Treaty_name?.[0]?.data?.Treaty_short_name}>
            {columns.map(col => (
              // @ts-expect-error: The types of col.parse
              // and col.key are guaranteed by the types above
              <td key={col.key}>{col.parse(treaty?.data?.[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default CountryTreaties
