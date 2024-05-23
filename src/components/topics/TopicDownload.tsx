import React, { memo } from 'react'
import styled from 'styled-components'
import ColumnSection from 'components/layout/ColumnSection'
import CSVDownloadLink from 'components/ui/CSVDownloadLink'
import ButtonLink from 'components/ui/ButtonLink'

const H2 = styled.h2`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`
const P = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  margin: 0;
`

interface SubtopicDataDownloadProps {
  topic: string
  // subtopics: Queries.TopicPageQuery['subtopics']
}

const SubtopicDataDownload = memo(({ topic }: SubtopicDataDownloadProps) => {
  //
  // Instead of generating the CSV from the data already on the page I'm just
  // going to use the existing links used for the /about/api page.
  //
  //________________________________________________________________________

  // const data: { [key: string]: string }[] = []

  // const statusNames = subtopics.nodes?.[0]?.data?.Subtopic_define_status_link
  // if (!statusNames) throw new Error('Missing status definitions')

  // const statusNamesMap: { [key: string]: string } = statusNames.reduce(
  //   (acc, status) =>
  //     status?.data?.Map_color
  //       ? {
  //           ...acc,
  //           [status.data.Map_color]: status?.data?.Status ?? '',
  //         }
  //       : acc,
  //   {}
  // )

  // subtopics.nodes?.forEach(subtopic => {
  //   subtopic.data?.Subtopic_assign_status_link?.forEach(country => {
  //     data.push({
  //       Subtopic: subtopic.data?.Subtopic ?? '',
  //       Country: country?.data?.Country?.[0]?.data?.ISO3 ?? '',
  //       Status:
  //         statusNamesMap[
  //           country?.data?.Status_link?.[0]?.data?.Map_color ?? ''
  //         ],
  //       'Status justification': country?.data?.Status_justification ?? '',
  //     })
  //   })
  // })
  //
  const url = `/csv/${topic}.csv`

  return (
    <ColumnSection rowReverse>
      <div>
        <H2>Download</H2>
      </div>
      <div>
        <P>
          Download a CSV of the country information that is displayed in the map
          above.
        </P>
        <ButtonLink href={url}>Download topic data</ButtonLink>
        {
          // <CSVDownloadLink
          //   filename={`AMP EID ${topic}`}
          //   label="Download topic data"
          //   data={data}
          //   style={{ maxWidth: 'fit-content', margin: 0 }}
          // />
        }
      </div>
    </ColumnSection>
  )
})

export default SubtopicDataDownload
