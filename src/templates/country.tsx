import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import MainHeader from 'components/layout/MainHeader'
import Main from 'components/layout/Main'
import ColumnSection from 'components/layout/ColumnSection'
import Flag from 'components/ui/Flag'
import CountryPolicies from 'components/countryPage/CountryPolicies'

const H1 = styled.h1`
  display: flex;
  align-items: center;
  gap: 15px;
`

const H2 = styled.h2`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
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
      <Main>
        <MainHeader>
          <h2>COUNTRY</h2>
          <H1>
            <Flag country={data.countryData} />
            {countryName}
          </H1>
        </MainHeader>
        <ColumnSection>
          <div>
            <div>Map Here</div>
            <div>Download country policies here</div>
          </div>
          <div>
            <H2>Explore policies</H2>
            <CountryPolicies {...data} />
          </div>
        </ColumnSection>
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query CountryPage($iso3: String) {
    countryData: airtableTrips(data: { ISO3: { eq: $iso3 } }) {
      flag {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 55, quality: 80)
        }
      }
      data {
        Country_name
      }
    }
    trips: airtableTrips(data: { ISO3: { eq: $iso3 } }) {
      data {
        All_applicable_countries_link {
          data {
            Document_name
            File_publish_date
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
