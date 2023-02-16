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

// const Layout = styled.div`
//   margin-top: 30px;
//   display: flex;
//   gap: 50px;
// `

const MainContent = styled.div``
const H3 = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${({ theme }) => theme.h3}
  color: ${({ theme }) => theme.black};
`
const Description = styled(RenderCMSRichText)`
  > p {
    margin: 0;
    ${({ theme }) => theme.paragraph}
    color: ${({ theme }) => theme.black};
    > a {
      color: ${({ theme }) => theme.ampEidMedBlue};
      text-decoration: underline;
    }
  }
`

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
          <H3>Description</H3>
          <Description markdown={treatyData.data?.Treaty_description ?? ''} />
          <StatusTable treatyData={treatyData} />
        </MainContent>
      </ColumnSection>
    </Main>
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
