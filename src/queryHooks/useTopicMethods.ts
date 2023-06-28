import { graphql, useStaticQuery } from 'gatsby'

const useTopicMethods = () => {
  const { methods } = useStaticQuery<Queries.TopicMethodsQuery>(graphql`
    query TopicMethods {
      methods: allAirtableDatabase(
        filter: { table: { eq: "Topic" }, data: { Publish: { eq: true } } }
        sort: { data: { Order: ASC } }
      ) {
        nodes {
          data {
            Method
          }
        }
      }
    }
  `)

  return methods
}

export default useTopicMethods
