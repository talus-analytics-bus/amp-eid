import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'
import CMS from '@talus-analytics/library.airtable-cms'
import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'

import Main from 'components/layout/Main'
import Providers from 'components/layout/Providers'
import MainHeader from 'components/layout/MainHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import Sidebar from 'components/treatyPage/Sidebar'
import StatusTable from 'components/treatyPage/StatusTable'
import ColumnSection from 'components/layout/ColumnSection'
import DocumentInfoSection from 'components/treatyPage/DocumentInfoSection'
import SubSection from 'components/layout/SubSection'
import Footer from 'components/layout/Footer'
import RelatedTreaties from 'components/topics/RelatedTreaties'
import RelatedTopics from 'components/ui/RelatedTopic'
import BlueCircleIcon from 'components/ui/BlueCircleIcon'
import StatesPartiesDefinitions from 'components/treatyPage/StatesPartiesDefinitions'

const MainContent = styled.div``
const H2 = styled.h2`
  margin: 0;
  ${({ theme }) => theme.h3}
  color: ${({ theme }) => theme.black};
`
const Footnote = styled(RenderCMSRichText)`
  // max-width: 1000px;
  > p {
    margin-top: 0;
    ${({ theme }) => theme.paragraph}
    color: ${({ theme }) => theme.black};
    > a {
      color: ${({ theme }) => theme.link};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

const TreatyPage = ({
  data: { treaty: treatyData },
  pageContext,
}: PageProps<Queries.TreatyPageQuery, { treaty_id: string }>) => {
  if (!treatyData?.data)
    throw new Error(`Treaty data not found for ${pageContext.treaty_id}`)

  return (
    <Providers>
      <CMS.SEO
        title={treatyData.data.Document_name ?? undefined}
        description={treatyData.data.Document_description ?? undefined}
      />
      <NavBar />
      <Main style={{ maxWidth: 1500 }}>
        <MainHeader>
          <h1>
            <BlueCircleIcon hideBG name="Treaty" size={40} />
            {treatyData.data.Document_name}
          </h1>
        </MainHeader>
        {
          // <ColumnSection>
        }
        <ColumnSection>
          <Sidebar treatyData={treatyData} />
          <MainContent>
            <DocumentInfoSection treatyPage document={treatyData} />
            {treatyData.data.Related_document &&
              treatyData.data.Related_document.length > 0 && (
                <SubSection>
                  <H2>Related treaties</H2>
                  <RelatedTreaties
                    relatedTreaties={
                      treatyData.data.Related_document as NoUndefinedField<
                        typeof treatyData.data.Related_document
                      >
                    }
                  />
                </SubSection>
              )}
            <RelatedTopics topic_link={treatyData.data.Document_topic_link} />
            <SubSection>
              {<H2>States parties</H2>}
              {treatyData.data.Treaty_footnotes && (
                <Footnote markdown={treatyData.data.Treaty_footnotes} />
              )}
              <StatusTable treatyData={treatyData} />
              <StatesPartiesDefinitions />
            </SubSection>
          </MainContent>
        </ColumnSection>
        {
          // </ColumnSection>
        }
      </Main>
      <Footer />
    </Providers>
  )
}

export default TreatyPage

export const query = graphql`
  query TreatyPage($treaty_id: String) {
    treaty: airtableDatabase(id: { eq: $treaty_id }) {
      data {
        Document_name
        File_source_URL
        Document_description
        File_publish_date
        Date_of_original_publication
        Date_entered_into_force
        Treaty_footnotes
        Original_language_title
        Language
        Document_topic_link {
          data {
            Topic
            Publish
          }
        }
        PDF {
          localFiles {
            prettySize
            publicURL
            ext
          }
        }
        Related_document {
          data {
            Treaty_short_name
            Document_name
          }
        }
        Treaty_status {
          data {
            Status
            Date_entered_into_force
            Reservations__understandings__and_declarations
            RUDs_text
            Date_ratified
            Date_signed
            Country {
              data {
                Country_name
              }
            }
          }
        }
      }
      documentThumbnail {
        childImageSharp {
          gatsbyImageData(height: 230, placeholder: BLURRED)
        }
      }
    }
  }
`
