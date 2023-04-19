import * as path from 'path'

import { GatsbyNode } from 'gatsby'

import simplifyForUrl from './src/utilities/simplifyForUrl'

import fs from 'fs'

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

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
  console.log("onPostBuild: write json file for API's data")
  const result = await graphql<Queries.APIQueryQuery>(`
    query APIQuery {
      Topics: allAirtableDatabase(
        filter: { table: { eq: "Topic" }, data: { Publish: { eq: true } } }
      ) {
        nodes {
          data {
            Name: Topic
            Method
            Subtopics: Topic_subtopic_link {
              data {
                Name: Subtopic
                Description: Subtopic_description
                Source: Subtopic_sources
                Statuses: Subtopic_define_status_link {
                  data {
                    Name: Status
                    Description: Status_description
                    Countries: Define_status_assign_status_link {
                      data {
                        Country {
                          data {
                            ISO3
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      Countries: allAirtableDatabase(
        filter: { table: { eq: "LOOKUP: Country" } }
      ) {
        nodes {
          data {
            ISO3
            Name: Country_name
            Treaties: Country_treaty_status_link {
              data {
                Name: Treaty_name {
                  data {
                    Document_name
                  }
                }
                Status
                Date_signed
                Date_ratified
                Date_entered_into_force
              }
            }
            Documents: All_applicable_countries_link {
              data {
                Name: Document_name
                Type: Document_type
                Date_of_original_publication
                Relevant_articles: Chaper__Section_or_Article
                Topics: Document_topic_link {
                  data {
                    Topic
                  }
                }
                Subtopics: Document_subtopic_link {
                  data {
                    Subtopic
                  }
                }
              }
            }
          }
        }
      }
      Treaties: allAirtableDatabase(
        filter: {
          table: { eq: "Document library" }
          data: { Document_type: { eq: "Treaty" } }
        }
        sort: { data: { Document_name: ASC } }
      ) {
        nodes {
          data {
            Name: Document_name
            Short_name: Treaty_short_name
            Description: Document_description
            Treaty_footnotes
            Date_of_original_publication
            Languages: Language
            Original_language_titles: Original_language_title
            Related_treaties: Related_document {
              data {
                Document_name
              }
            }
            States_parties: Treaty_status {
              data {
                ISO3: Country {
                  data {
                    ISO3
                  }
                }
                Name: Country {
                  data {
                    Country_name
                  }
                }
                Status
                Date_entered_into_force
                Date_ratified
                Date_signed
                Reservations_understandings_and_declarations: Reservations__understandings__and_declarations
                RUDs_text
              }
            }
          }
        }
      }
      Documents: allAirtableDatabase(
        filter: {
          table: { eq: "Document library" }
          data: { Document_type: { ne: "Treaty" } }
        }
        sort: { data: { Document_name: ASC } }
      ) {
        nodes {
          data {
            Name: Document_name
            Subtitle: Document_subtitle
            Authoring_country {
              data {
                ISO3
              }
            }
            Authoring_regional_organization {
              data {
                Name
              }
            }
            All_applicable_countries {
              data {
                ISO3
              }
            }
            Topics: Document_topic_link {
              data {
                Topic
              }
            }
            Subtopics: Document_subtopic_link {
              data {
                Subtopic
              }
            }
            Document_type
            Description: Document_description
            Date_of_original_publication
            Date_entered_into_force
            Languages: Language
            Original_language_titles: Original_language_title
          }
        }
      }
    }
  `)

  console.log('write json file')
  console.log(result)

  const dir = './public/api/v1'

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(`${dir}/raw.json`, JSON.stringify(result))

  // strip out all levels of nesting where there is only one key
  // in the object. This happens a lot with "data" and "nodes"
  // or places where there are many levels of nesting with only
  // one value at the bottom of the tree.

  const preserveArray = new Set([
    'Topics',
    'Subtopics',
    'Countries',
    'Languages',
    'Original_language_titles',
    'Reservations_understandings_and_declarations',
    'All_applicable_countries',
    'Related_treaties',
  ])

  type ObjLike = { [key: string]: unknown }
  const format = (obj: ObjLike | null): unknown => {
    if (!obj) return obj
    if (typeof obj !== 'object') return obj

    const keys = Object.keys(obj)
    if (keys.length === 1) obj = format(obj[keys[0]] as ObjLike) as ObjLike

    if (keys.length > 1)
      for (const [key, child] of Object.entries(obj as ObjLike))
        if (Array.isArray(child) && preserveArray.has(key))
          child.forEach((item, i) => (child[i] = format(item as ObjLike)))
        else obj[key] = format(child as ObjLike)

    return obj
  }

  format(result)

  fs.writeFileSync(`${dir}/index.json`, JSON.stringify(result))

  for (const [section, data] of Object.entries(result)) {
    if (!fs.existsSync(`${dir}/${section}`)) {
      fs.mkdirSync(`${dir}/${section}`, { recursive: true })
    }
    fs.writeFileSync(`${dir}/${section}/index.json`, JSON.stringify(data))
  }
}
