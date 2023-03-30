import React from 'react'
import styled from 'styled-components'
import SubSection from 'components/layout/SubSection'
import simplifyForUrl from 'utilities/simplifyForUrl'
import BlueCircleIcon from './BlueCircleIcon'
import GreyBoxLink from './GreyBoxLink'

const H3 = styled.h3`
  margin: 0;
  ${({ theme }) => theme.h3}
  color: ${({ theme }) => theme.black};
`

interface RelatedTopicsProps {
  topic_link:
    | readonly ({
        readonly data: {
          readonly Topic: string | null
          readonly Publish: boolean | null
        } | null
      } | null)[]
    | null
}

const RelatedTopics = ({ topic_link }: RelatedTopicsProps) => {
  if (
    !topic_link ||
    topic_link.length === 0 ||
    topic_link.every(t => t?.data?.Publish !== true)
  )
    return <></>

  return (
    <SubSection>
      <H3>Related {topic_link.length === 1 ? 'topic' : 'topics'}</H3>
      {topic_link.map(
        topic =>
          topic?.data?.Topic &&
          (topic?.data?.Publish !== null || undefined) && (
            <GreyBoxLink to={`/topics/${simplifyForUrl(topic.data.Topic)}`}>
              <BlueCircleIcon name={topic.data.Topic} size={40} />
              <span>{topic.data.Topic}</span>
            </GreyBoxLink>
          )
      )}
    </SubSection>
  )
}

export default RelatedTopics
