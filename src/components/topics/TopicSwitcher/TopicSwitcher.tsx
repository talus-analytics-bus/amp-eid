import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import MapLegend from './MapLegend'

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
`
const SubtopicsContainer = styled.div`
  flex-basis: 350px;
`
const MapContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: ${({ theme }) => theme.lightGray};
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
          <div>Map</div>
        </MapContainer>
      </Layout>
    </SubtopicContext.Provider>
  )
}

export default TopicSwitcher
