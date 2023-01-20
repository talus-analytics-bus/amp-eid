import React, { useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from '../TopicSwitcher'

const MapPlaceholder = styled.div`
  flex-grow: 1;
  min-height: 50vh;
  background-color: ${({ theme }) => theme.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubtopicMap = () => {
  const context = useContext(SubtopicContext)
  if (!context) throw new Error('MapLegend must be inside SubtopicContext')
  const { subtopicIndex, subtopicData } = context
  console.log(subtopicData)

  return (
    <MapPlaceholder>
      <div>
        <p>Display map for {subtopicData[subtopicIndex ?? 0].data?.Subtopic}</p>
      </div>
    </MapPlaceholder>
  )
}

export default SubtopicMap
