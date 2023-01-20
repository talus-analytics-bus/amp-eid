import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
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
        <AccordionParent>
          {subtopics.tripsSubtopics.nodes
            .filter(subtopic => Boolean(subtopic.data?.Subtopic))
            .map(subTopic => (
              <Accordion
                key={subTopic.data?.Subtopic}
                title={subTopic.data?.Subtopic}
              >
                {subTopic.data?.Subtopic_description}
              </Accordion>
            ))}
        </AccordionParent>
      </SubtopicsContainer>
      <MapContainer>
        <div>Map</div>
      </MapContainer>
    </Layout>
  )
}

export default TopicSwitcher
