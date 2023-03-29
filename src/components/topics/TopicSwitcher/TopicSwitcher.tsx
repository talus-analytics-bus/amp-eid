import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import ColumnSection from 'components/layout/ColumnSection'
import SubtopicDescription from './subtopicDescription'
import MapLegend from './SubtopicMap/MapLegend'
import SubtopicMap from './SubtopicMap/SubtopicMap'

export interface SubtopicContextProps {
  subtopicData: Queries.TopicPageQuery['subtopics']['nodes']
  subtopicIndex: number | null
  setSubtopicIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const SubtopicContext = createContext<SubtopicContextProps | null>(null)

const Column = styled.div`
  @media (max-width: 600px) {
    margin-left: -30px;
    margin-right: -30px;
    width: calc(100% + 60px);
  }
`

const NoGapColumnSection = styled(ColumnSection)`
  margin-top: 0;

  @media (max-width: 1000px) {
    gap: 0;
  }
`

interface TopicSwitcherProps {
  data: Queries.TopicPageQuery
}

const TopicSwitcher = ({ data }: TopicSwitcherProps) => {
  if (!data) throw new Error('No subtopics found')

  const [subtopicIndex, setSubtopicIndex] = useState<number | null>(0)

  return (
    <SubtopicContext.Provider
      value={{
        subtopicData: data.subtopics.nodes,
        subtopicIndex,
        setSubtopicIndex,
      }}
    >
      <ColumnSection columnReverse>
        <Column>
          <MapLegend />
        </Column>
        <Column>
          <SubtopicMap />
        </Column>
      </ColumnSection>
      <NoGapColumnSection noBorder>
        <span></span>
        <SubtopicDescription />
      </NoGapColumnSection>
    </SubtopicContext.Provider>
  )
}

export default TopicSwitcher
