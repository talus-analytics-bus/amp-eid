import { graphql, useStaticQuery } from 'gatsby'

const useShortTreatyNames = () => {
  const {
    treaties: { distinct: shortNames },
  } = useStaticQuery<Queries.TreatyShortNamesQuery>(graphql`
    query TreatyShortNames {
      treaties: allAirtableDatabase(
        filter: { table: { eq: "Document library" } }
      ) {
        distinct(field: { data: { Treaty_short_name: SELECT } })
      }
    }
  `)
  return shortNames
}

export default useShortTreatyNames
