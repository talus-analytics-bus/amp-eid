import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'

import useTopics from 'queryHooks/useTopics'
import simplifyForUrl from 'utilities/simplifyForUrl'
import { GatsbyImage } from 'gatsby-plugin-image'
import BlueCircleIcon from 'components/ui/BlueCircleIcon'

const TopicLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const Li = styled.li`
  display: block;
  overflow: hidden;
  flex-basis: 30%;
  flex-grow: 1;

  @media (max-width: 800px) {
    flex-basis: 45%;
  }
  @media (max-width: 500px) {
    flex-basis: 100%;
  }
`
const ImageLink = styled(Link)`
  position: relative;
  transition: 150ms ease;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 15px;

  &:hover {
    background: ${({ theme }) => theme.ampEidDarkBlue};
    transition: 250ms ease;
  }
`
const ComingSoonLinkPlaceholder = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`
const ImageLinkTextContainer = styled.div`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  text-align: center;
  margin-bottom: 15px;
`

type Topic = Exclude<Queries.TopicsQuery['topics'], null>['nodes'][number]

const getNameAndImage = (topic: Topic) => {
  const topicName = topic?.data?.Topic
  if (!topicName) throw new Error('All topics must have a name')

  const image =
    topic?.data?.Image?.localFiles?.at(0)?.childImageSharp?.gatsbyImageData
  if (!image) throw new Error('All topics must have a map image')

  return { topicName, image }
}

const TopicLink = ({ topic }: { topic: Topic }) => {
  const { topicName, image } = getNameAndImage(topic)
  return (
    <Li>
      <ImageLink to={`/topics/${simplifyForUrl(topicName)}`}>
        <BlueCircleIcon name={topicName} size={40} />
        <ImageLinkTextContainer>{topicName}</ImageLinkTextContainer>
        <GatsbyImage image={image} alt={`${topicName} preview map`} />
      </ImageLink>
    </Li>
  )
}

const DisabledTopicLink = ({ topic }: { topic: Topic }) => {
  const theme = useTheme()
  const { topicName, image } = getNameAndImage(topic)
  return (
    <Li>
      <ComingSoonLinkPlaceholder>
        <BlueCircleIcon name={topicName} size={40} bgColor={theme.darkGray} />
        <ImageLinkTextContainer>{topicName}</ImageLinkTextContainer>
        <GatsbyImage image={image} alt={`${topicName} map coming soon`} />
      </ComingSoonLinkPlaceholder>
    </Li>
  )
}

const TopicList = () => {
  const topics = useTopics()

  return (
    <TopicLinkList>
      {topics.map(topic =>
        topic?.data?.Disable ? (
          <DisabledTopicLink key={topic?.data.Topic} topic={topic} />
        ) : (
          <TopicLink key={topic?.data?.Topic} topic={topic} />
        )
      )}
    </TopicLinkList>
  )
}

export default TopicList
