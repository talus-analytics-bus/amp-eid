import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import SubtopicDescription from './subtopicDescription'
import MapLegend from './SubtopicMap/MapLegend'
import SubtopicMap from './SubtopicMap/SubtopicMap'

interface SubtopicContextProps {
  subtopicData: Queries.TripsPageQuery['subtopics']['nodes']
  subtopicIndex: number | null
  setSubtopicIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const SubtopicContext = createContext<SubtopicContextProps | null>(null)

const Layout = styled.section`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    margin-left: -30px;
    margin-right: -30px;
    width: calc(100% + 60px);
  }
`
const SubtopicsContainer = styled.div`
  min-width: 350px;
  @media (max-width: 1000px) {
    min-width: auto;
  }
`
const MapContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
`

interface TopicSwitcherProps {
  data: Queries.TripsPageQuery
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
      <Layout>
        <SubtopicsContainer>
          <MapLegend />
        </SubtopicsContainer>
        <MapContainer>
          <SubtopicMap />
          <SubtopicDescription />
        </MapContainer>
      </Layout>
    </SubtopicContext.Provider>
  )
}

export default TopicSwitcher
