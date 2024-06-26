import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import MainHeader from 'components/layout/MainHeader'
import Main from 'components/layout/Main'
import Flag from 'components/ui/Flag'
import CountryPolicies from 'components/countryPage/CountryPolicies'
import SubSection from 'components/layout/SubSection'
import CountryTreaties from 'components/countryPage/CountryTreaties'
import Footer from 'components/layout/Footer'
import StatesPartiesDefinitions from 'components/treatyPage/StatesPartiesDefinitions'

const H1 = styled.h1`
  display: flex;
  align-items: center;
  gap: 15px;
`

const H2 = styled.h2`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`

const CountryPage = ({ data }: PageProps<Queries.CountryPageQuery>) => {
  const countryName = data.countryData?.data?.Country_name
  if (!countryName) throw new Error('All countries must have a country name')

  return (
    <Providers>
      <CMS.SEO
        title={`AMP EID ${countryName}`}
        description={`Policies and topics related to emerging infectious diseases in ${countryName}`}
      />
      <NavBar />
      <Main style={{ maxWidth: 1500 }}>
        <MainHeader>
          <H1>
            <Flag country={data.countryData} style={{ marginTop: '-.25em' }} />
            <span>{countryName}</span>
          </H1>
        </MainHeader>
        {
          // <ColumnSection>
          //   <div>
          // <div>Map Here</div>
          // <div>Download country policies here</div>
          // </div>
          // <div>
        }
        <SubSection style={{ marginTop: 20 }}>
          <H2>Explore policies</H2>
          <CountryPolicies
            policies={data.countryData.data.All_applicable_countries_link}
          />
          <SubSection>
            <H2>Treaties</H2>
            <CountryTreaties
              countryName={data.countryData.data.Country_name}
              treaties={data.countryData.data.Country_treaty_status_link}
            />
            <StatesPartiesDefinitions />
          </SubSection>
        </SubSection>
        {
          // </div>
          // </ColumnSection>
        }
      </Main>
      <Footer />
    </Providers>
  )
}

export const query = graphql`
  query CountryPage($country_id: String) {
    countryData: airtableDatabase(id: { eq: $country_id }) {
      flag {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 55, quality: 80)
        }
      }
      data {
        Country_name
        Country_treaty_status_link {
          data {
            Treaty_name {
              data {
                Treaty_short_name
              }
            }
            Status
            Date_signed
            Date_ratified
            Date_entered_into_force
            Reservations__understandings__and_declarations
            RUDs_text
          }
        }
        All_applicable_countries_link {
          data {
            Document_name
            File_publish_date
            Authoring_country {
              data {
                Country_name
              }
            }
            Document_subtopic_link {
              data {
                Subtopic
              }
            }
            Document_topic_link {
              data {
                Topic
                Order
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
  }
`

export default CountryPage
