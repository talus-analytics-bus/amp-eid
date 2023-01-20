import Accordion, { AccordionParent } from 'components/ui/Accordion/Accordion'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import camelCase from 'utilities/camelCase'

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
const MapKey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 10px;
`
const KeyEntry = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
`
const ColorBlock = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  margin-top: 0.15em;
  width: 20px;
  height: 20px;
`

const TopicSwitcher = ({ subtopics }: TopicSwitcherProps) => {
  const theme = useTheme()

  return (
    <Layout>
      <SubtopicsContainer>
        <AccordionParent>
          {subtopics.tripsSubtopics.nodes
            .filter(subtopic => Boolean(subtopic.data?.Subtopic))
            .map(subtopic => (
              <Accordion
                key={subtopic.data?.Subtopic}
                renderButton={open => (
                  <TopicButton
                    style={{
                      background: open ? theme.ampEidDarkBlue : theme.lightGray,
                      color: open ? theme.white : theme.black,
                      borderColor: open ? theme.black : theme.medDarkGray,
                    }}
                  >
                    {subtopic.data?.Subtopic}
                  </TopicButton>
                )}
              >
                <MapKey>
                  {subtopic.data?.Define_status &&
                    subtopic.data.Define_status.map(status => {
                      if (!status || !status.data)
                        throw new Error('Empty map legend entry')

                      const keyColor = camelCase(status?.data?.Map_color)
                      if (!keyColor)
                        throw new Error(
                          `Map legend color undefined for ${status.data.Status}`
                        )
                      return (
                        <KeyEntry>
                          <ColorBlock
                            style={{
                              background: theme[keyColor as keyof typeof theme],
                            }}
                          />
                          <span>{status?.data?.Status}</span>
                        </KeyEntry>
                      )
                    })}
                </MapKey>
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
