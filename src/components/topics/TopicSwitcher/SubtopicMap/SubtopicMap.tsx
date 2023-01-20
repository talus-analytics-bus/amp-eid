import React, { useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from '../TopicSwitcher'

const MapPlaceholder = styled.div`
  position: relative;
  flex-grow: 1;
  height: 50vh;
  background-color: ${({ theme }) => theme.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`
const MapTitle = styled.h3`
  ${({ theme }) => theme.h3};
  color: ${({ theme }) => theme.black};
  position: absolute;
  margin: 0;
  padding: 0;
  top: 15px;
  left: 30px;
`

const SubtopicMap = () => {
  const context = useContext(SubtopicContext)
  if (!context) throw new Error('MapLegend must be inside SubtopicContext')
  const { subtopicIndex, subtopicData } = context

  return (
    <MapPlaceholder>
      <MapTitle>{subtopicData[subtopicIndex ?? 0].data?.Subtopic}</MapTitle>
    </MapPlaceholder>
  )
}

export default SubtopicMap
