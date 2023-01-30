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
}
