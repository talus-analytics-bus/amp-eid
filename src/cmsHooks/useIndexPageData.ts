import { useStaticQuery, graphql } from 'gatsby'

import { AirtableCMSData } from '@talus-analytics/library.airtable-cms'

// Sites will have many of these content hooks, each
// of which corresponds to one table in Airtable.
const useIndexPageData = () => {
  const { cmsContent }: { cmsContent: AirtableCMSData } =
    useStaticQuery(graphql`
      query {
        cmsContent: allAirtable(filter: { table: { eq: "Landing Page" } }) {
          nodes {
            data {
              Name
              Text
              Image {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(height: 600, placeholder: NONE)
                  }
                }
              }
            }
          }
        }
      }
    `)

  return cmsContent
}

export default useIndexPageData
