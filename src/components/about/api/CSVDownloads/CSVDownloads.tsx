import React, { useState } from 'react'

import useTopics from 'queryHooks/useTopics'

const CSVDownloads = () => {
  const topics = useTopics()

  const topicOptions = {
    'All topics': {
      name: 'All topics',
      link: '/csv/All topics.csv',
    },
  }

  topics.forEach(topic => {
    topicOptions[topic.data?.Topic] = {
      name: topic.data?.Topic,
      link: `/csv/${topic.data?.Topic}.csv`,
    }
  })

  const [selectedTopic, setSelectedTopic] = useState(topicOptions['All topics'])

  return (
    <>
      <select onChange={e => setSelectedTopic(topicOptions[e.target.value])}>
        {topicOptions.map(topic => (
          <option>{topic.data?.Topic}</option>
        ))}
      </select>
      <a href={selectedTopic.link}>{selectedTopic.name}</a>
    </>
  )
}

export default CSVDownloads
