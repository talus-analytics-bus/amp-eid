import React, { useState } from 'react'

import useTopics from 'queryHooks/useTopics'
import styled from 'styled-components'
import ButtonLink from 'components/ui/ButtonLink'
import DownloadIcon from 'components/ui/DownloadIcon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin-top: 20px;

  select {
    ${({ theme }) => theme.paragraphMedium};
    padding: 5px 15px;
  }
`

interface TopicOptions {
  [key: string]: {
    name: string
    link: string
  }
}

const CSVDownloads = () => {
  const topics = useTopics()

  const topicOptions: TopicOptions = {
    'All topics': {
      name: 'All topics',
      link: '/csv/All topics.csv',
    },
  }

  topics.forEach(topic => {
    if (!topic.data?.Topic) return
    topicOptions[topic.data?.Topic] = {
      name: topic.data?.Topic,
      link: `/csv/${topic.data?.Topic}.csv`,
    }
  })

  const [selectedTopic, setSelectedTopic] = useState(topicOptions['All topics'])

  return (
    <Container>
      <select onChange={e => setSelectedTopic(topicOptions[e.target.value])}>
        {Object.values(topicOptions).map(topic => (
          <option>{topic.name}</option>
        ))}
      </select>
      <ButtonLink href={selectedTopic.link}>
        <DownloadIcon />
        Download topic data (CSV)
      </ButtonLink>
    </Container>
  )
}

export default CSVDownloads
