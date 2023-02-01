import React, { useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from './TopicSwitcher'
import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'

const Description = styled.p`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
  margin: 0;
  padding: 0;
  padding-bottom: 20px;

  @media (max-width: 600px) {
    margin-left: 30px;
    margin-right: 30px;
  }
`
const Citation = styled(RenderCMSRichText)`
  @media (max-width: 600px) {
    margin-left: 30px;
    margin-right: 30px;
  }
  > p {
    ${({ theme }) => theme.smallParagraph};
    color: ${({ theme }) => theme.darkGray};
    margin: 0;
    padding: 0;

    > a {
      ${({ theme }) => theme.smallParagraph};
      color: ${({ theme }) => theme.darkGray};
      text-decoration: underline;
    }
  }
`

// Note on accessibility and SEO:
// https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-manual.html

const SubtopicDescription = () => {
  const context = useContext(SubtopicContext)
  if (!context) throw new Error('MapLegend must be inside SubtopicContext')
  const { subtopicIndex, subtopicData } = context

  return (
    <>
      {subtopicData.map((subtopic, index) => (
        <div
          key={index}
          id={`tabpanel-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          style={{ display: subtopicIndex === index ? 'block' : 'none' }}
        >
          <Description>{subtopic.data?.Subtopic_description}</Description>
          <Citation
            markdown={
              subtopic.data?.Subtopic_sources
                ? 'Source: ' + subtopic.data?.Subtopic_sources
                : ''
            }
          />
        </div>
      ))}
    </>
  )
}

export default SubtopicDescription
