import { graphql, useStaticQuery } from 'gatsby'

const useCountryNames = () => {
  const { countries } =
    useStaticQuery<Queries.CountryNamesForSearchQuery>(graphql`
      query CountryNamesForSearch {
        countries: allAirtableDatabase(
          filter: {
            data: {
              Country_name: {
                nin: ["Regional", "Treaty", "European Union", null]
              }
            }
          }
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
