import { graphql, useStaticQuery } from 'gatsby'

const useTopicNames = () => {
  const {
    topics: { distinct: topicNames },
  } = useStaticQuery<Queries.TopicNamesQuery>(graphql`
    query TopicNames {
      topics: allAirtableDatabase(filter: { table: { eq: "Topic" } }) {
        distinct(field: { data: { Topic: SELECT } })
      }
    }
  `)
  return topicNames
}

export default useTopicNames
