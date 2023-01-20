import React from 'react'
import styled, { useTheme } from 'styled-components'
import camelCase from 'utilities/camelCase'

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

interface MapStatusKeyProps {
  subtopic: Queries.TripsPageQuery['tripsSubtopics']['nodes'][0]['data']
}

const MapStatusKey = ({ subtopic }: MapStatusKeyProps) => {
  const theme = useTheme()

  if (!subtopic || !subtopic.Define_status) return <></>

  return (
    <MapKey>
      {subtopic.Define_status &&
        subtopic.Define_status.map(status => {
          if (!status || !status.data) throw new Error('Empty map legend entry')

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
  )
}

export default MapStatusKey
