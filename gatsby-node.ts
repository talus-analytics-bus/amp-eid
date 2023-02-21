import * as path from 'path'

import { GatsbyNode } from 'gatsby'

import simplifyForUrl from './src/utilities/simplifyForUrl'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const treatyPageTemplate = path.resolve('./src/templates/treaty.tsx')

  const treatyNames = await graphql<Queries.TreatyShortNamesQuery>(`
    query ShortNames {
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

  if (!treatyNames.data?.shortNames) throw new Error('No treaties found')

  for (const short_name of treatyNames.data.shortNames.distinct) {
    actions.createPage({
      path: `/treaties/${simplifyForUrl(short_name)}/`,
      component: treatyPageTemplate,
      context: { short_name },
    })
  }

  const documentPageTemplate = path.resolve('./src/templates/document.tsx')

  const documentNames = await graphql<Queries.DocumentNamesQuery>(`
    query DocumentNames {
      names: allAirtableDocuments(
        filter: {
          data: { Document_type: { ne: "Treaty" } }
          table: { eq: "Document library" }
        }
      ) {
        nodes {
          recordId
          data {
            Document_name
            Authoring_country {
              data {
                Country_name
              }
            }
          }
        }
      }
    }
  `)

  if (!documentNames.data?.names) throw new Error('No documents found')

  for (const document of documentNames.data.names.nodes) {
    const name = document.data?.Document_name
    if (!name) throw new Error('All documents must have names')

    const authoringCountry =
      document.data?.Authoring_country?.[0]?.data?.Country_name
    if (!authoringCountry)
      throw new Error(
        `Document ${name} does not have an "Authoring country" which has a "Country name".`
      )

    actions.createPage({
      path: `/documents/${simplifyForUrl(authoringCountry)}/${simplifyForUrl(
        name
      )}/`,
      component: documentPageTemplate,
      context: {
        recordId: document.recordId,
      },
    })
  }

  const countryPageTemplate = path.resolve('./src/templates/country.tsx')

  const countryNames = await graphql<Queries.CountryNamesQuery>(`
    query CountryNames {
      countries: allAirtableDocuments(
        filter: {
          table: { eq: "LOOKUP: Country" }
          data: {
            Country_name: {
              nin: ["Regional", "Treaty", "European Union", null]
            }
          }
        }
      ) {
        nodes {
          data {
            ISO3
            Country_name
          }
        }
      }
    }
  `)

  if (!countryNames.data?.countries) throw new Error('No countries found')

  for (const country of countryNames.data.countries.nodes) {
    const iso3 = country.data?.ISO3
    const countryName = country.data?.Country_name
    if (!iso3 || !countryName)
      throw new Error('All countries must have names and ISO3 codes')

    actions.createPage({
      path: `/countries/${simplifyForUrl(countryName)}/`,
      component: countryPageTemplate,
      context: { iso3 },
    })
  }
}
