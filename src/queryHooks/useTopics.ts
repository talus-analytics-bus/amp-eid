import { graphql, useStaticQuery } from 'gatsby'

const useTopics = () => {
  const { topics } = useStaticQuery<Queries.TopicsQuery>(graphql`
    query Topics {
      topics: allAirtableDatabase(
        filter: { table: { eq: "Topic" } }
        sort: { data: { Order: ASC } }
      ) {
        nodes {
          data {
            Topic
            Disable
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(width: 500, placeholder: NONE)
                }
              }
            }
          }
        }
      }
    }
  `)
  return topics.nodes
}

export default useTopics
