import { graphql, PageProps } from 'gatsby'
import React from 'react'
import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import Providers from 'components/layout/Providers'
import MainHeader from 'components/layout/MainHeader'

const TreatyPage = ({ data }: PageProps<Queries.TreatyPageQuery>) => {
  const treatyData = data.general.nodes[0]
  return (
    <Providers>
      <CMS.SEO />
      <Main>
        <MainHeader>
          <h1>{treatyData.data?.Document_name}</h1>
        </MainHeader>
      </Main>
    </Providers>
  )
}

export default TreatyPage

export const query = graphql`
  query TreatyPage($short_name: String) {
    general: allAirtableTreaties(
      filter: {
        table: { eq: "LOOKUP: Treaty" }
        data: {
          Treaty_name: {
            elemMatch: { data: { Treaty_short_name: { eq: $short_name } } }
          }
        }
      }
    ) {
      nodes {
        data {
          Document_name
          Treaty_description
          Date_of_latest_update
          Date_opened_for_signature
          Date_of_original_publication
          Attachments {
            localFiles {
              publicURL
            }
            raw {
              thumbnails {
                large {
                  url
                }
              }
            }
          }
          Country_link {
            data {
              Status
              Date_became_a_party
              Date_ratified
              Date_signed
              Country {
                data {
                  Country_name
                  ISO_3166_1_alpha_3
                }
              }
            }
          }
        }
      }
    }
  }
`
