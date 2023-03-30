import React, { useMemo } from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import Providers from 'components/layout/Providers'

import TopicSwitcher from 'components/topics/TopicSwitcher/TopicSwitcher'
import RelatedTreaties from 'components/topics/RelatedTreaties'
import ExplorePolicies from 'components/topics/ExplorePolicies/ExplorePolicies'
import Footer from 'components/layout/Footer'
import ColumnSection from 'components/layout/ColumnSection'
import BlueCircleIcon from 'components/ui/BlueCircleIcon'
import restructureDocuments from 'components/topics/ExplorePolicies/restructureDocuments'
import SubSection from 'components/layout/SubSection'

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
}: PageProps<Queries.TopicPageQuery>): JSX.Element => {
  const topic = data.topic?.data?.Topic
  if (!topic) throw new Error(`All topic pages must have topic names`)

  const countryDocuments = useMemo(() => {
    return restructureDocuments(data.topicDocuments)
  }, [data.topicDocuments])

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main>
        <MainHeader>
          <h1>
            <BlueCircleIcon hideBG name={topic} size={40} />
            {topic}
          </h1>
        </MainHeader>
        <TopicSwitcher {...{ data, countryDocuments }} />
        <ColumnSection rowReverse>
          <H3>Related treaty</H3>
          <RelatedTreaties relatedTreaties={data.relatedTreaties.nodes} />
        </ColumnSection>
        <ExplorePolicies countryDocuments={countryDocuments} />
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
    relatedTreaties: allAirtableDatabase(
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
          Subtopic_sources
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
    topicDocuments: allAirtableDatabase(
      filter: {
        table: { eq: "Document library" }
        data: {
          Document_type: { ne: "Treaty" }
          Document_topic_link: { elemMatch: { id: { eq: $topic_id } } }
        }
      }
    ) {
      nodes {
        data {
          Document_name
          File_publish_date
          All_applicable_countries {
            flag {
              childImageSharp {
                gatsbyImageData(width: 40, placeholder: BLURRED)
              }
            }
            data {
              Country_name
              ISO3
            }
          }
          Authoring_country {
            data {
              Country_name
            }
          }
        }
        documentThumbnail {
          childImageSharp {
            gatsbyImageData(width: 100, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  }
`

export default TripsPage
