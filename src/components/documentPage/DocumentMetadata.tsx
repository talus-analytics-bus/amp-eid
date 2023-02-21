import React from 'react'
import styled from 'styled-components'
import formatAirtableDate from 'utilities/formatDate'
import parseAirtableDate from 'utilities/parseDate'

const Container = styled.div`
  background-color: ${({ theme }) => theme.veryLightGray};
  border-radius: 5px;
  padding: 0px 20px 30px 20px;
`
const MetadataTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;
  & td:nth-child(2) {
    ${({ theme }) => theme.paragraphMedium};
    color: ${({ theme }) => theme.black};
    padding-left: 15px;
  }
`

const DocumentMetadata = ({ document }: Queries.DocumentPageQuery) => {
  const fileDates = document?.data?.File_publish_date

  let displayMostRecent
  const mostRecent =
    fileDates &&
    fileDates
      .map(string => parseAirtableDate(string!))
      .sort((a, b) => b.getTime() - a.getTime())
      .at(0)

  if (mostRecent) displayMostRecent = formatAirtableDate(mostRecent)

  const metadata = {
    'Latest update': displayMostRecent,
    'Entered into force': document?.data?.Date_entered_into_force,
    'Original publication': document?.data?.Date_of_original_publication,
    'Relevant articles': document?.data?.Chaper__Section_or_Article,
    Note: document?.data?.Document_note,
  }

  return (
    <Container>
      <MetadataTable>
        <tbody>
          {Object.entries(metadata).map(
            ([label, value]) =>
              value && (
                <tr>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              )
          )}
        </tbody>
      </MetadataTable>
    </Container>
  )
}

export default DocumentMetadata
