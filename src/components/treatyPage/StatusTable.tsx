import React from 'react'
import styled from 'styled-components'

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

  const columns = [
    // { displayName: 'Country', key: 'Country' },
    { displayName: 'Status', key: 'Status' },
    { displayName: 'Signed', key: 'Date_signed' },
    { displayName: 'Ratified', key: 'Date_ratified' },
    { displayName: 'Became a party', key: 'Date_became_a_party' },
  ]

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            {columns.map(col => (
              <th>{col.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countryList.map(country => (
            <tr>
              <td>{country?.data?.Country?.[0]?.data?.Country_name}</td>
              {columns.map(col => (
                <td>
                  {country?.data?.[col.key as keyof typeof country['data']] ??
                    ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default StatusTable
