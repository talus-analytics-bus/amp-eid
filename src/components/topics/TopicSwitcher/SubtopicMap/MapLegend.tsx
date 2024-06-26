import React, { useContext } from 'react'
import styled, { useTheme } from 'styled-components'
import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import MapStatusKey from './MapStatusKey'
import { SubtopicContext } from '../TopicSwitcher'

const Container = styled(AccordionParent)`
  border: 1px solid ${({ theme }) => theme.ampEidDarkBlue};
  border-radius: 5px;
  overflow: hidden;
`

const TopicButton = styled.button`
  ${({ theme }) => theme.labels};
  border: none;
  margin: 0;
  background: none;
  width: 100%;
  padding: 5px 10px;
  text-align: left;
  color: ${({ theme }) => theme.white};
  transition: 250ms ease;
  border-top: 1px solid ${({ theme }) => theme.medDarkGray};
  font-size: 16px;
  padding: 8px 12px;

  &:hover {
    background: ${({ theme }) => theme.medGray};
  }

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
    <Container
      preventCloseAll
      openIndex={subtopicIndex}
      setOpenIndex={setSubtopicIndex}
      aria-orientation="vertical"
      role="tablist"
    >
      {subtopicData.map(({ data: subtopic }, index) => (
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
                backgroundColor: open ? theme.ampEidDarkBlue : theme.lightGray,
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
    </Container>
  )
}

export default MapLegend
