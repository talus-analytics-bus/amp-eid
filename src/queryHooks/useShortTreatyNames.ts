import { graphql, useStaticQuery } from 'gatsby'

const useShortTreatyNames = () => {
  const { shortNames } = useStaticQuery<Queries.TreatyShortNamesQuery>(graphql`
    query TreatyShortNames {
      shortNames: allAirtableTreaties(
        filter: {
          table: {
            eq: "ALL: ONLY USE THIS TAB INSTEAD OF THE SINGLE TABS FROM NOW ON"
          }
        }
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
