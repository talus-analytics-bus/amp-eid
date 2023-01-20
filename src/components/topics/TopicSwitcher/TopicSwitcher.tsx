import React from 'react'
import styled from 'styled-components'
import MapLegend from './MapLegend'

const Layout = styled.section`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`
const SubtopicsContainer = styled.div`
  flex-basis: 350px;
  border: 1px solid ${({ theme }) => theme.black};
`
const MapContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface TopicSwitcherProps {
  data: Queries.TripsPageQuery
}

const TopicSwitcher = ({ data }: TopicSwitcherProps) => {
  if (!data) throw new Error('No subtopics found')

  return (
    <Layout>
      <SubtopicsContainer>
        <MapLegend subtopics={data.subtopics.nodes} />
      </SubtopicsContainer>
      <MapContainer>
        <div>Map</div>
      </MapContainer>
    </Layout>
  )
}

export default TopicSwitcher
