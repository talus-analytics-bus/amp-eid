import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Layout = styled.section`
  margin-top: 30px;
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

const TopicButton = styled.button`
  width: 100%;
  padding: 5px 10px;
  text-align: left;
  color: ${({ theme }) => theme.white};
  transition: 250ms ease;
  border: 1px solid ${({ theme }) => theme.medDarkGray};
  border-bottom: none;

  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.medDarkGray};
  }
`

const TopicSwitcher = ({ subtopics }: TopicSwitcherProps) => {
  const theme = useTheme()

  return (
    <Layout>
      <SubtopicsContainer>
        <AccordionParent>
          {subtopics.tripsSubtopics.nodes
            .filter(subtopic => Boolean(subtopic.data?.Subtopic))
            .map(subTopic => (
              <Accordion
                key={subTopic.data?.Subtopic}
                renderButton={open => (
                  <TopicButton
                    style={{
                      background: open ? theme.ampEidDarkBlue : theme.lightGray,
                      color: open ? theme.white : theme.black,
                      borderColor: open ? theme.black : theme.medDarkGray,
                    }}
                  >
                    {subTopic.data?.Subtopic}
                  </TopicButton>
                )}
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
