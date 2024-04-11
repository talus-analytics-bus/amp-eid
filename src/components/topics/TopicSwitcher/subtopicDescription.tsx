import React, { useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from './TopicSwitcher'
import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'
import ColumnSection from 'components/layout/ColumnSection'

import CMS from '@talus-analytics/library.airtable-cms'

const Description = styled.div`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  margin: 0;
  padding: 0;
  // padding-bottom: 20px;
  line-height: 28px;
  flex-basis: 60%;
  flex-grow: 1;
`
const SubtopicText = styled.div``

const Citation = styled(RenderCMSRichText)`
  width: 350px;
  > p {
    ${({ theme }) => theme.smallParagraph};
    color: ${({ theme }) => theme.veryDarkGray};
    margin: 0;
    padding: 0;

    > a {
      ${({ theme }) => theme.smallParagraph};
      color: ${({ theme }) => theme.veryDarkGray};
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
          style={{
            display: subtopicIndex === index ? 'block' : 'none',
          }}
        >
          <ColumnSection
            noBorder
            rowReverse
            columnReverse
            style={{ paddingTop: 0 }}
          >
            <Citation
              markdown={
                subtopic.data?.Subtopic_sources
                  ? 'Source: ' + subtopic.data?.Subtopic_sources
                  : ''
              }
            />
            <Description>
              <SubtopicText
                dangerouslySetInnerHTML={{
                  __html: CMS.parseRichText(
                    subtopic.data?.Subtopic_description ?? ''
                  ),
                }}
              />
            </Description>
          </ColumnSection>
        </div>
      ))}
    </>
  )
}

export default SubtopicDescription
