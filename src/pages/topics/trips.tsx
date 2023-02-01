import React from 'react'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import Providers from 'components/layout/Providers'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import TopicSwitcher from 'components/topics/TopicSwitcher/TopicSwitcher'

// Trips page data sources

// Each expander Comes from subtopics
// subtopics table => titles are the first columns
// key: from "Define status" table
// colors are in the last column; names match Figma names

// Map
// Map title: subtopic title
// "Assign status" table has the association between country, subtopic, and status

// descriptions under map => subtopics table paragraphs

// Find a country => use mapbox search

const TripsPage = ({
  data,
}: PageProps<Queries.TripsPageQuery>): JSX.Element => {
  const indexPageCMSData = useIndexPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <MainHeader>
          <h2>TOPIC</h2>
          <h1>
            <CMS.Text name="TRIPS text" data={indexPageCMSData} />
          </h1>
        </MainHeader>
        <TopicSwitcher data={data} />
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query TripsPage {
    subtopics: allAirtableTrips(filter: { table: { eq: "1. Subtopic" } }) {
      nodes {
        data {
          Subtopic
          Subtopic_description
          Subtopic_sources
          Define_status {
            data {
              Map_color
              Status
              Status_description
            }
          }
          Assign_status {
            data {
              Country {
                data {
                  ISO_3166_1_alpha_3
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
    relatedTreaties: allAirtableTrips(
      filter: {
        table: { eq: "LOOKUP: Document (imported)" }
        data: { Document_type: { eq: "Treaty" } }
      }
    ) {
      nodes {
        data {
          Document_name
        }
      }
    }
  }
`

export default TripsPage
