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
import restructureCountryMetadata from 'components/topics/ExplorePolicies/restructureCountryMetadata'
import formatAirtableDate from 'utilities/formatDate'
import SubtopicDataDownload from 'components/topics/TopicDownload'

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

const DateHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const Date = styled.div`
  ${({ theme }) => theme.smallParagraph};
  justify-self: flex-end;
  margin-left: auto;
  padding-top: 10px;
  padding-bottom: 10px;
`
const H2 = styled.h2`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`

const TripsPage = ({
  data,
}: PageProps<Queries.TopicPageQuery>): JSX.Element => {
  const topic = data.topic?.data?.Topic
  if (!topic) throw new Error(`All topic pages must have topic names`)

  const countryMetadata = useMemo(() => {
    return restructureCountryMetadata(data.countryMetadata)
  }, [data.countryMetadata])

  const countryDocuments = useMemo(() => {
    return restructureDocuments(data.topicDocuments)
  }, [data.topicDocuments])

  return (
    <Providers>
      <CMS.SEO
        title={`AMP EID ${topic}`}
        description={`Global maps, policies, and analysis related to emerging infectious diseases in ${topic}`}
      />
      <NavBar />
      <Main>
        <MainHeader>
          <DateHolder>
            <h1>
              <BlueCircleIcon hideBG name={topic} size={40} />
              {topic}
            </h1>
            <Date>
              Data last updated{' '}
              {formatAirtableDate(data.topic.data.Last_updated ?? '')}
            </Date>
          </DateHolder>
        </MainHeader>
        <TopicSwitcher {...{ data, countryDocuments, countryMetadata }} />
        {data.relatedTreaties.nodes.length > 0 && (
          <ColumnSection rowReverse>
            <H2>Related treaty</H2>
            <RelatedTreaties relatedTreaties={data.relatedTreaties.nodes} />
          </ColumnSection>
        )}
        <ExplorePolicies {...{ countryDocuments, countryMetadata }} />
        <SubtopicDataDownload
          topic={data.topic.data.Topic}
          // subtopics={data.subtopics}
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
        Last_updated
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
              Status_justification
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
          Document_subtopic_link {
            data {
              Subtopic
            }
          }
          All_applicable_countries {
            data {
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
    countryMetadata: allAirtableDatabase(
      filter: { data: { ISO3: { ne: null } } }
    ) {
      nodes {
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
    }
  }
`

export default TripsPage
