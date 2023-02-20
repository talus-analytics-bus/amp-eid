import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'
import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import Providers from 'components/layout/Providers'
import MainHeader from 'components/layout/MainHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import Sidebar from 'components/treatyPage/Sidebar'
import StatusTable from 'components/treatyPage/StatusTable'
import ColumnSection from 'components/layout/ColumnSection'
import MainInfoSection from 'components/treatyPage/MainInfoSection'
import SubSection from 'components/layout/SubSection'
import Footer from 'components/layout/Footer'
import RelatedTreaties from 'components/topics/RelatedTreaties'

const MainContent = styled.div``
const H3 = styled.h3`
  margin: 0;
  ${({ theme }) => theme.h3}
  color: ${({ theme }) => theme.black};
`
const P = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  margin: 0;
`

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

const TreatyPage = ({
  data: {
    general: {
      nodes: [treatyData],
    },
  },
}: PageProps<Queries.TreatyPageQuery>) => (
  <Providers>
    <CMS.SEO
      title={treatyData.data?.Document_name ?? undefined}
      description={treatyData.data?.Treaty_description ?? undefined}
    />
    <NavBar />
    <Main>
      <MainHeader>
        <h2>TREATY</h2>
        <h1>{treatyData.data?.Document_name}</h1>
      </MainHeader>
      <ColumnSection>
        <Sidebar treatyData={treatyData} />
        <MainContent>
          <MainInfoSection treatyData={treatyData} />
          {treatyData.data?.Related_document &&
            treatyData.data.Related_document?.[0]?.data && (
              <SubSection>
                <H3>Related Treaties</H3>
                <RelatedTreaties
                  relatedTreaties={
                    treatyData.data.Related_document as NoUndefinedField<
                      typeof treatyData.data.Related_document
                    >
                  }
                />
              </SubSection>
            )}
          <SubSection>
            <H3>States Parties</H3>
            <P>{treatyData.data?.Treaty_footnotes}</P>
            <StatusTable treatyData={treatyData} />
          </SubSection>
        </MainContent>
      </ColumnSection>
    </Main>
    <Footer />
  </Providers>
)

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
          File_source_URL
          Treaty_description
          File_publish_date
          Date_opened_for_signature
          Date_of_original_publication
          Treaty_footnotes
          Related_document {
            data {
              Treaty_short_name
              Document_name
            }
          }
          PDF {
            localFiles {
              publicURL
              prettySize
              ext
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
                  ISO3
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
  }
`
