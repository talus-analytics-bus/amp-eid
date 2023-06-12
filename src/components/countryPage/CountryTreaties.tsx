import { Status, StatusPill } from 'components/treatyPage/StatusTable'
import CSVDownloadLink from 'components/ui/CSVDownloadLink'
import StyledTable from 'components/ui/StyledTable'
import { Link } from 'gatsby'
import React, { useMemo } from 'react'
import formatAirtableDate from 'utilities/formatDate'
import simplifyForUrl from 'utilities/simplifyForUrl'

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
    [Exclude<typeof treaties[number], null>][number]['data'],
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
    render?: (val: TreatyData[T] | undefined) => React.ReactNode
    stringify?: (val: TreatyData[T] | undefined) => string
  }

  // create type to take keyos of CountryData and return Column<'key 1'> | Column<'key 2'>
  type ConvertToUnion<T> = T[keyof T]
  type ColumnTypeUnion<T extends keyof TreatyData> = ConvertToUnion<{
    [key in T]: Column<key>
  }>

  const columns: ColumnTypeUnion<Exclude<keyof TreatyData, ''>>[] = useMemo(
    () => [
      {
        displayName: 'Treaty',
        key: 'Treaty_name',
        render: val => (
          <Link
            to={`/treaties/${simplifyForUrl(
              val?.[0]?.data?.Treaty_short_name ?? '#'
            )}`}
          >
            {val?.[0]?.data?.Treaty_short_name}
          </Link>
        ),
        stringify: val => val?.[0]?.data?.Treaty_short_name ?? '',
      },
      {
        displayName: 'Status',
        key: 'Status',
        render: val => (
          <StatusPill status={val as unknown as Status}>{val}</StatusPill>
        ),
        stringify: val => val ?? '',
      },
      {
        displayName: 'Signed',
        key: 'Date_signed',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
      },
      {
        displayName: 'Ratified',
        key: 'Date_ratified',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
      },
      {
        displayName: 'Entered into force',
        key: 'Date_entered_into_force',
        render: val => (val ? formatAirtableDate(val) : ''),
        stringify: val =>
          val ? new Date(val).toISOString().split('T')[0] : '',
      },
      {
        displayName: 'Reservations, understandings, and declarations',
        key: 'Reservations__understandings__and_declarations',
        stringify: val => (val && val.join(', ')) ?? '',
      },
      {
        displayName: 'Reservations, understandings, and declarations text',
        key: 'RUDs_text',
        stringify: val => val ?? '',
      },
    ],
    []
  )

  const csvData = useMemo(
    () =>
      sortedTreaties.map(treaty => {
        const row: { [key: string]: string } = {}
        columns.forEach(
          column =>
            column.stringify &&
            (row[column.displayName] = column.stringify(
              // @ts-expect-error: The types of col.parse
              // and col.key are guaranteed by the types above
              treaty?.data?.[column.key]
            ))
        )
        return row
      }),
    [sortedTreaties, columns]
  )

  return (
    <>
      <CSVDownloadLink
        csvData={csvData}
        label="States parties"
        style={{ width: 'fit-content' }}
      />
      <StyledTable>
        <thead>
          <tr>
            {columns.map(
              col =>
                col.render && <th key={col.displayName}>{col.displayName}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedTreaties.map(treaty => (
            <tr key={treaty?.data?.Treaty_name?.[0]?.data?.Treaty_short_name}>
              {columns.map(
                col =>
                  col.render && (
                    // @ts-expect-error: The types of col.parse
                    // and col.key are guaranteed by the types above
                    <td key={col.key}>{col.render(treaty?.data?.[col.key])}</td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  )
}

export default CountryTreaties
