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
          }
        }
      }
    }
  `)

  if (!documentNames.data?.names) throw new Error('No documents found')

  for (const document of documentNames.data.names.nodes) {
    if (!document.data?.Document_name)
      throw new Error('All documents must have names')

    actions.createPage({
      path: `/documents/${simplifyForUrl(document.data?.Document_name)}`,
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
          data: { Country_name: { nin: ["Regional", "Treaty"] } }
        }
      ) {
        nodes {
          data {
            ISO3
          }
        }
      }
    }
  `)

  if (!countryNames.data?.countries) throw new Error('No countries found')

  for (const country of countryNames.data.countries.nodes) {
    if (!country.data?.ISO3)
      throw new Error('All countries must have ISO3 codes')

    actions.createPage({
      path: `/countries/${country.data.ISO3.toLowerCase()}`,
      component: countryPageTemplate,
      context: {
        iso3: country.data.ISO3,
      },
    })
  }
}
