// use Typescript with gatsby node apis here
import * as path from 'path'

import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const treatyPageTemplate = path.resolve('./src/templates/treaty.tsx')

  const treatyNames = await graphql<Queries.TreatyShortNamesQuery>(`
    query ShortNames {
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

  if (!treatyNames.data?.shortNames) throw new Error('No treaties found')

  for (const short_name of treatyNames.data.shortNames.distinct) {
    actions.createPage({
      path: `/treaties/${short_name}/`,
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
          id
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
      path: `/documents/${document.data?.Document_name}`,
      component: documentPageTemplate,
      context: {
        id: document.id,
      },
    })
  }
}
