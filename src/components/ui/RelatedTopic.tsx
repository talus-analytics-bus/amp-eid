import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import SubSection from 'components/layout/SubSection'

const relatedTopicURLMap = {
  'Trade and intellectual property': '/topics/trade-and-intellectual-property',
}

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
  topics: readonly (string | null)[] | null | undefined
}

const RelatedTopics = ({ topics }: RelatedTopicsProps) => {
  if (!topics || topics.length === 0) return <></>

  return (
    <>
      {topics.map(
        topic =>
          topic && (
            <SubSection>
              <H3>Related Topic</H3>
              <StyledLink
                to={
                  relatedTopicURLMap[topic as keyof typeof relatedTopicURLMap]
                }
              >
                {topic}
              </StyledLink>
            </SubSection>
          )
      )}
    </>
  )
}

export default RelatedTopics
