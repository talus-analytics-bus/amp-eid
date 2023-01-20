import React from 'react'
import styled, { useTheme } from 'styled-components'
import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import MapStatusKey from './MapStatusKey'

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

interface MapLegendProps {
  subtopics: Queries.TripsPageQuery['tripsSubtopics']['nodes']
}

const MapLegend = ({ subtopics }: MapLegendProps) => {
  const theme = useTheme()

  if (!subtopics) throw new Error('No subtopics found')

  return (
    <AccordionParent>
      {subtopics
        .filter(({ data }) => Boolean(data?.Subtopic && data.Define_status))
        .map(({ data: subtopic }) => (
          <Accordion
            key={subtopic?.Subtopic}
            renderButton={open => (
              <TopicButton
                style={{
                  background: open ? theme.ampEidDarkBlue : theme.lightGray,
                  color: open ? theme.white : theme.black,
                  borderColor: open ? theme.black : theme.medDarkGray,
                }}
              >
                {subtopic?.Subtopic}
              </TopicButton>
            )}
          >
            <MapStatusKey subtopic={subtopic} />
          </Accordion>
        ))}
    </AccordionParent>
  )
}

export default MapLegend
