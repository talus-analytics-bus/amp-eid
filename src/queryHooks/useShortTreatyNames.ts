import { graphql, useStaticQuery } from 'gatsby'

const useShortTreatyNames = () => {
  const { shortNames } = useStaticQuery<Queries.TreatyShortNamesQuery>(graphql`
    query TreatyShortNames {
      shortNames: allAirtableDatabase(
        filter: { table: { eq: "Document library" } }
      ) {
        distinct(field: { data: { Treaty_short_name: SELECT } })
      }
    }
  `)
  return shortNames
}

export default useShortTreatyNames
