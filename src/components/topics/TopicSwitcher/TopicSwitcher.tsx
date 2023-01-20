import React from 'react'
import styled from 'styled-components'

const Layout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`
const SubtopicsContainer = styled.div`
  flex-basis: 350px;
`
const MapContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface TopicSwitcherProps {
  subtopics: Queries.TripsPageQuery
}

const TopicSwitcher = ({ subtopics }: TopicSwitcherProps) => {
  return (
    <Layout>
      <SubtopicsContainer>
        {subtopics.topics.nodes.map(topic => (
          <p>{topic.data?.Subtopic}</p>
        ))}
      </SubtopicsContainer>
      <MapContainer>
        <div>Map</div>
      </MapContainer>
    </Layout>
  )
}

export default TopicSwitcher
