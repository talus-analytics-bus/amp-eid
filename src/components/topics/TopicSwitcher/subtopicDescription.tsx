import React, { useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from './TopicSwitcher'
import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'

const Description = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
  margin: 0;
  padding: 0;
`
const Citation = styled(RenderCMSRichText)`
  > p {
    ${({ theme }) => theme.smallParagraph};
    color: ${({ theme }) => theme.darkGray};
    margin: 0;
    padding: 0;

    > a {
      ${({ theme }) => theme.smallParagraph};
      color: ${({ theme }) => theme.darkGray};
    }
  }
`

const SubtopicDescription = () => {
  const context = useContext(SubtopicContext)
  if (!context) throw new Error('MapLegend must be inside SubtopicContext')
  const { subtopicIndex, subtopicData } = context

  return (
    <>
      <Description>
        {subtopicData[subtopicIndex ?? 0].data?.Subtopic_description}
      </Description>
      <Citation
        markdown={
          'Source: ' +
            subtopicData[subtopicIndex ?? 0].data?.Subtopic_sources ?? ''
        }
      />
    </>
  )
}

export default SubtopicDescription
