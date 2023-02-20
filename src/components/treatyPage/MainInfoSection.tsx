import React from 'react'
import styled from 'styled-components'

import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'
import formatAirtableDate from 'utilities/formatDate'
import parseAirtableDate from 'utilities/parseDate'

const Container = styled.div`
  background-color: ${({ theme }) => theme.veryLightGray};
  border-radius: 5px;
  padding: 0px 20px 30px 20px;
`
const DateTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;
  & td:nth-child(2) {
    ${({ theme }) => theme.paragraphMedium};
    color: ${({ theme }) => theme.black};
    padding-left: 15px;
  }
`
const Description = styled(RenderCMSRichText)`
  > p {
    margin-top: 30px 0 0 0;
    ${({ theme }) => theme.paragraph}
    color: ${({ theme }) => theme.black};
    > a {
      color: ${({ theme }) => theme.ampEidMedBlue};
      text-decoration: underline;
    }
  }
`

const MainInfoSection = ({
  treatyData,
}: {
  treatyData: Queries.TreatyPageQuery['general']['nodes'][0]
}) => {
  const fileData = treatyData.data?.PDF?.localFiles?.[0]

  if (!fileData?.prettySize || !fileData.publicURL)
    throw new Error(
      `File metadata not found for treaty ${treatyData.data?.Document_name}`
    )

  const openedForSignature = treatyData.data?.Date_opened_for_signature
  const originalPublication = treatyData.data?.Date_of_original_publication
  const fileDates = treatyData.data?.File_publish_date

  let latestUpdate

  if (fileDates) {
    const mostRecent = fileDates
      .split(',')
      .map(string => parseAirtableDate(string))
      .sort((a, b) => b.getTime() - a.getTime())
      .at(0)

    if (mostRecent) latestUpdate = formatAirtableDate(mostRecent)
  }

  return (
    <Container>
      <DateTable>
        <tbody>
          {openedForSignature && (
            <tr>
              <td>Date opened for signature</td>
              <td>{formatAirtableDate(openedForSignature)}</td>
            </tr>
          )}
          {originalPublication && (
            <tr>
              <td>Date of original publication</td>
              <td>{formatAirtableDate(originalPublication)}</td>
            </tr>
          )}
          {latestUpdate && (
            <tr>
              <td>Latest update</td>
              <td>{latestUpdate}</td>
            </tr>
          )}
        </tbody>
      </DateTable>
      <Description markdown={treatyData.data?.Treaty_description ?? ''} />
    </Container>
  )
}

export default MainInfoSection
