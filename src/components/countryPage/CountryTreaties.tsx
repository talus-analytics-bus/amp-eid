import StyledTable from 'components/ui/StyledTable'
import { Link } from 'gatsby'
import React from 'react'
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
    { displayName: 'Status', key: 'Status', parse: val => val },
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
    <StyledTable>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.displayName}>{col.displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {treaties.map(treaty => (
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
