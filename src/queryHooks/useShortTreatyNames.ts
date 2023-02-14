import { graphql, useStaticQuery } from 'gatsby'

const useShortTreatyNames = () => {
  const { shortNames } = useStaticQuery<Queries.TreatyShortNamesQuery>(graphql`
    query TreatyShortNames {
      shortNames: allAirtableTreaties(
        filter: { table: { eq: "All treaties and countries" } }
      ) {
        distinct(
          field: {
            data: { Treaty_name: { data: { Treaty_short_name: SELECT } } }
          }
        )
      }
    }
  `)

  return shortNames
}

export default useShortTreatyNames
