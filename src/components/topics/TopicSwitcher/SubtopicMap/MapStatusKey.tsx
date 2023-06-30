import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import camelCase from 'utilities/camelCase'

const MapKey = styled.div`
  ${({ theme }) => theme.smallParagraph};
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
  // margin-top: 0.15em;
  width: 20px;
  height: 20px;
`

interface MapStatusKeyProps {
  subtopic: Queries.TopicPageQuery['subtopics']['nodes'][0]['data']
}

const MapStatusKey = ({ subtopic }: MapStatusKeyProps) => {
  const theme = useTheme()

  const sortedStatuses = useMemo(
    () =>
      subtopic?.Subtopic_define_status_link &&
      [...subtopic.Subtopic_define_status_link].sort(
        (a, b) =>
          a?.data?.Map_color?.localeCompare(b?.data?.Map_color ?? '') ?? -1
      ),
    [subtopic]
  )

  if (!sortedStatuses) return <></>

  return (
    <MapKey>
      {sortedStatuses.map(status => {
        if (!status || !status.data || !status.data.Map_color)
          throw new Error('Empty map legend entry')

        const keyColor = camelCase(status.data.Map_color)
        if (!keyColor)
          throw new Error(
            `Map legend color undefined for ${status.data.Status}`
          )
        return (
          <KeyEntry key={status.data.Status}>
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
