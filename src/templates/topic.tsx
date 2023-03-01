import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import Providers from 'components/layout/Providers'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import TopicSwitcher from 'components/topics/TopicSwitcher/TopicSwitcher'
import RelatedTreaties from 'components/topics/RelatedTreaties'
import ExplorePolicies from 'components/topics/ExplorePolicies/ExplorePolicies'
import Footer from 'components/layout/Footer'
import ColumnSection from 'components/layout/ColumnSection'

// Trips page data sources

// Each expander Comes from subtopics
// subtopics table => titles are the first columns
// key: from "Define status" table
// colors are in the last column; names match Figma names

// Map
// Map title: subtopic title
// "Assign statuy" table has the association between country, subtopic, and status

// descriptions under map => subtopics table paragraphs

// Find a country => use mapbox search

const H3 = styled.h3`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`

const TripsPage = ({
  data,
}: PageProps<Queries.TripsPageQuery>): JSX.Element => {
  const indexPageCMSData = useIndexPageData()

  return <>Coming soon</>

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <MainHeader>
          <h2>TOPIC</h2>
          <h1>
            <CMS.Text name="Topic 1 text" data={indexPageCMSData} />
          </h1>
        </MainHeader>
        <TopicSwitcher data={data} />
        <ColumnSection>
          <H3>Treaty</H3>
          <RelatedTreaties relatedTreaties={data.relatedTreaties.nodes} />
        </ColumnSection>
        <ExplorePolicies
          countryDocuments={data.countryDocuments}
          thumbnails={data.thumbnails}
        />
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query TopicPage($topic_id: String) {
    topic: airtableDatabase(id: { eq: $topic_id }) {
      data {
        Topic
      }
    }
    rlatedTreaties: allAirtableDatabase(
      filter: {
        table: { eq: "Document library" }
        data: {
          Document_type: { eq: "Treaty" }
          Document_topic_link: { elemMatch: { id: { eq: $topic_id } } }
        }
      }
    ) {
      nodes {
        data {
          Document_name
          Treaty_short_name
        }
      }
    }
    subtopics: allAirtableDatabase(
      filter: {
        table: { eq: "Subtopic" }
        data: { Subtopic_topic_link: { elemMatch: { id: { eq: $topic_id } } } }
      }
      sort: { data: { Order: ASC } }
    ) {
      nodes {
        data {
          Subtopic
          Subtopic_description
          Subtopic_define_status_link {
            data {
              Status
              Map_color
              Status_description
            }
          }
          Subtopic_assign_status_link {
            data {
              Country {
                data {
                  ISO3
                }
              }
              Status_link {
                data {
                  Map_color
                }
              }
            }
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query TripsPage {
//     subtopics: allAirtableTrips(
//       filter: { table: { eq: "1. Subtopic" } }
//       sort: { data: { Order: ASC } }
//     ) {
//       nodes {
//         data {
//           Subtopic
//           Subtopic_description
//           Subtopic_sources
//           Order
//           Define_status {
//             data {
//               Map_color
//               Status
//               Status_description
//             }
//           }
//           Assign_status {
//             data {
//               Country {
//                 data {
//                   ISO3
//                 }
//               }
//               Status_link {
//                 data {
//                   Map_color
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     relatedTreaties: allAirtableTrips(
//       filter: {
//         table: { eq: "LOOKUP: Document (imported)" }
//         data: { Document_type: { eq: "Treaty" } }
//       }
//     ) {
//       nodes {
//         data {
//           Document_name
//           Treaty_short_name
//         }
//       }
//     }
//     countryDocuments: allAirtableTrips(
//       filter: {
//         table: { eq: "LOOKUP: Country (imported)" }
//         data: { Country_name: { nin: ["Regional", "Treaty", null] } }
//       }
//     ) {
//       nodes {
//         flag {
//           childImageSharp {
//             gatsbyImageData(width: 40, placeholder: BLURRED)
//           }
//         }
//         data {
//           Country_name
//           ISO3
//           All_applicable_countries_link {
//             data {
//               Document_name
//               File_publish_date
//               Authoring_country {
//                 data {
//                   Country_name
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     thumbnails: allAirtableDocuments(
//       filter: { data: { Topic: { eq: "Trade and intellectual property" } } }
//     ) {
//       nodes {
//         documentThumbnail {
//           childImageSharp {
//             gatsbyImageData(width: 100, placeholder: DOMINANT_COLOR)
//           }
//         }
//         data {
//           Document_name
//         }
//       }
//     }
//   }
// `

export default TripsPage
