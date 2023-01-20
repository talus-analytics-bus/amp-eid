import React, { useContext, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import MapStatusKey from './MapStatusKey'
import { SubtopicContext } from './TopicSwitcher'

const TopicButton = styled.button`
  width: 100%;
  padding: 5px 10px;
  text-align: left;
  color: ${({ theme }) => theme.white};
  transition: 250ms ease;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.medDarkGray};

  &:first-of-type {
    border-top: none;
  }
`

const MapLegend = () => {
  const theme = useTheme()

  const context = useContext(SubtopicContext)
  if (!context) throw new Error('MapLegend must be inside SubtopicContext')
  const { subtopicIndex, setSubtopicIndex, subtopicData } = context

  return (
    <AccordionParent openIndex={subtopicIndex} setOpenIndex={setSubtopicIndex}>
      {subtopicData
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
