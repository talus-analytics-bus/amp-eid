import React from 'react'
import styled from 'styled-components'
import formatDate from 'utilities/formatDate'

const Container = styled.div`
  margin-top: 30px;
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid ${({ theme }) => theme.medGray};
      padding: 10px;
    }
    tr:nth-child(odd) {
      background: ${({ theme }) => theme.ampEidVeryLightBlue};
    }
    thead {
      tr:nth-child(odd) {
        background: white;
      }
      th {
        text-align: left;
      }
    }
  }
`
const StatusTable = ({
  treatyData,
}: {
  treatyData: Queries.TreatyPageQuery['general']['nodes'][0]
}) => {
  const countryList = treatyData.data?.Country_link
  if (!countryList || countryList.length === 0 || !countryList[0]?.data)
    throw new Error(
      `Country list not found for treaty ${treatyData.data?.Document_name}`
    )

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
      parse: val => val?.[0]?.data?.Country_name,
    },
    { displayName: 'Status', key: 'Status', parse: val => val },
    {
      displayName: 'Signed',
      key: 'Date_signed',
      parse: val => (val ? formatDate(val) : ''),
    },
    {
      displayName: 'Ratified',
      key: 'Date_ratified',
      parse: val => (val ? formatDate(val) : ''),
    },
    {
      displayName: 'Became a party',
      key: 'Date_became_a_party',
      parse: val => (val ? formatDate(val) : ''),
    },
  ]

  return (
    <Container>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th>{col.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countryList.map(country => (
            <tr>
              {columns.map(col => (
                // @ts-expect-error: The types of col.parse
                // and col.key are guaranteed by the types above
                <td>{col.parse(country?.data?.[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default StatusTable
