import { graphql, useStaticQuery } from 'gatsby'

const useCountryNames = () => {
  const { countries } = useStaticQuery<Queries.CountryNamesQuery>(graphql`
    query CountryNames {
      countries: allAirtableDocuments(
        filter: { table: { eq: "LOOKUP: Country" } }
      ) {
        nodes {
          data {
            Country_name
            ISO3
          }
        }
      }
    }
  `)

  return countries
}

export default useCountryNames
