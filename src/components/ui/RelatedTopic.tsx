import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import SubSection from 'components/layout/SubSection'
import simplifyForUrl from 'utilities/simplifyForUrl'

const H3 = styled.h3`
  margin: 0;
  ${({ theme }) => theme.h3}
  color: ${({ theme }) => theme.black};
`
const StyledLink = styled(Link)`
  ${({ theme }) => theme.bigParagraphMedium};
  border-radius: 5px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.veryLightGray};
  transition: 150ms ease;
  color: ${({ theme }) => theme.black};

  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    transition: 250ms ease;
  }
`

interface RelatedTopicsProps {
  topic_link:
    | readonly ({
        readonly data: {
          readonly Topic: string | null
        } | null
      } | null)[]
    | null
}

const RelatedTopics = ({ topic_link }: RelatedTopicsProps) => {
  if (!topic_link || topic_link.length === 0) return <></>

  return (
    <SubSection>
      <H3>Related {topic_link.length === 1 ? 'Topic' : 'Topics'}</H3>
      {topic_link.map(
        topic =>
          topic?.data?.Topic && (
            <StyledLink to={`/topics/${simplifyForUrl(topic.data.Topic)}`}>
              {topic.data.Topic}
            </StyledLink>
          )
      )}
    </SubSection>
  )
}

export default RelatedTopics
