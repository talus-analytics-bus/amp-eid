import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from '@talus-analytics/library.airtable-cms'

const useStatesPartiesDefinitionQuery = () => {
  const {
    statesPartiesDefinitionQuery,
  }: { statesPartiesDefinitionQuery: AirtableCMSData } = useStaticQuery(graphql`
    query statesPartiesDefinitionQuery {
      statesPartiesDefinitionQuery: allAirtable(
        filter: {
          table: { eq: "Glossary" }
          data: { Name: { eq: "States parties definitions" } }
        }
      ) {
        nodes {
          data {
            Name
            Text
          }
        }
      }
    }
  `)

  return statesPartiesDefinitionQuery
}

export default useStatesPartiesDefinitionQuery
