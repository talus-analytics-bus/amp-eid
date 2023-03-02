import * as path from 'path'

import { GatsbyNode } from 'gatsby'

import simplifyForUrl from './src/utilities/simplifyForUrl'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const topicPageTemplate = path.resolve('./src/templates/topic.tsx')

  const topicQuery = await graphql<Queries.TopicNamesQuery>(`
    query TopicNames {
      topics: allAirtableDatabase(
        filter: { table: { eq: "Topic" }, data: { Disable: { ne: true } } }
      ) {
        nodes {
          id
          data {
            Topic
          }
        }
      }
    }
  `)

  if (!topicQuery.data?.topics.nodes)
    throw new Error('No topics found to publish')

  for (const topic of topicQuery.data.topics.nodes) {
    if (!topic.data?.Topic)
      throw new Error(
        'All topics must have a topic name in the "Topic" column.'
      )

    actions.createPage({
      path: `/topics/${simplifyForUrl(topic.data?.Topic)}/`,
      component: topicPageTemplate,
      context: { topic_id: topic.id },
    })
  }

  const treatyPageTemplate = path.resolve('./src/templates/treaty.tsx')
  const treatyNames = await graphql<Queries.TreatyPageUrlsQuery>(`
    query TreatyPageUrls {
      shortNames: allAirtableDatabase(
        filter: {
          table: { eq: "Document library" }
          data: { Document_type: { eq: "Treaty" } }
        }
      ) {
        nodes {
          id
          data {
            Treaty_short_name
          }
        }
      }
    }
  `)
  if (!treatyNames.data?.shortNames.nodes.length)
    throw new Error('No treaties found')

  for (const treaty of treatyNames.data.shortNames.nodes) {
    if (!treaty.data?.Treaty_short_name)
      throw new Error(`All treaties must have short names`)

    actions.createPage({
      path: `/treaties/${simplifyForUrl(treaty.data?.Treaty_short_name)}/`,
      component: treatyPageTemplate,
      context: { treaty_id: treaty.id },
    })
  }

  const documentPageTemplate = path.resolve('./src/templates/document.tsx')
  const documentNames = await graphql<Queries.DocumentNamesQuery>(`
    query DocumentNames {
      names: allAirtableDatabase(
        filter: {
          table: { eq: "Document library" }
          data: { Document_type: { ne: "Treaty" } }
        }
      ) {
        nodes {
          id
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
        document_id: document.id,
      },
    })
  }

  const countryPageTemplate = path.resolve('./src/templates/country.tsx')
  const countryNames = await graphql<Queries.CountryNamesQuery>(`
    query CountryNames {
      countries: allAirtableDatabase(
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
          id
          data {
            Country_name
            ISO3
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
      context: { country_id: country.id },
    })
  }
}
