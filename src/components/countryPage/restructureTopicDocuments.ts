import type { Policies } from './CountryPolicies'
type TopicDocument = Exclude<Policies, null>[number]

interface TopicsObject {
  // prettier-ignore
  [key: string]: {
    topic:
      Exclude<
        Exclude<
          Exclude<
            TopicDocument, null
          >['data'], null
        >['Document_topic_link'], null
      >[number]

    documents: Exclude<TopicDocument[], null>
  }
}

const restructureTopicDocuments = (topicDocuments: Policies) => {
  const topicsObj: TopicsObject = {}
  if (!topicDocuments) return []

  for (const document of topicDocuments) {
    if (!document) break
    const topics = document.data?.Document_topic_link
    if (!topics) break

    for (const topic of topics) {
      if (!topic?.data?.Topic) break

      if (!topicsObj[topic.data.Topic])
        topicsObj[topic.data.Topic] = {
          topic: topic,
          documents: [document],
        }
      else topicsObj[topic.data.Topic].documents.push(document)
    }
  }
  const countriesList = Object.values(topicsObj).sort((a, b) =>
    !b.topic?.data?.Order || !a.topic?.data?.Order
      ? -1
      : a.topic.data.Order - b.topic.data.Order
  )

  return countriesList
}

export default restructureTopicDocuments
