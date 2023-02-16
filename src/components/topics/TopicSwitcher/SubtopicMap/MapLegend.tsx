import React, { useContext, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import MapStatusKey from './MapStatusKey'
import { SubtopicContext } from '../TopicSwitcher'

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.black};
`

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

  // removing 'readonly' from the gatsby-generated type
  // so we can sort without typescript complaining
  type subtopicMutable = {
    -readonly [key in keyof typeof subtopicData[0]]: typeof subtopicData[0][key]
  }
  const subtopics = subtopicData as subtopicMutable[]

  return (
    <Container aria-orientation="vertical">
      <AccordionParent
        preventCloseAll
        openIndex={subtopicIndex}
        setOpenIndex={setSubtopicIndex}
      >
        {subtopics
          // coercing here becasuse we know these exist
          // and a type guard would slow it down.
          .sort((a, b) => b.data?.Order! - a.data?.Order!)
          .map(({ data: subtopic }, index) => (
            <Accordion
              key={subtopic?.Subtopic}
              renderButton={open => (
                <TopicButton
                  id={`tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={open}
                  aria-controls={`tabpanel-${index}`}
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
    </Container>
  )
}

export default MapLegend
