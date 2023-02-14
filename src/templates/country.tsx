import React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import MainHeader from 'components/layout/MainHeader'
import Main from 'components/layout/Main'
import ColumnSection from 'components/layout/ColumnSection'
import { GatsbyImage } from 'gatsby-plugin-image'

const H1 = styled.h1`
  display: flex;
  align-items: center;
  gap: 15px;
`

const H2 = styled.h2`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
`

const CountryPage = ({
  data: { country, flagData },
}: PageProps<Queries.CountryPageQuery>) => {
  const countryName = country?.data?.Country_name
  const flag = flagData?.flag?.childrenImageSharp?.[0]?.gatsbyImageData

  if (!countryName) throw new Error('All countries must have a country name')
  if (!flag) throw new Error(`Flag not found for ${countryName}`)

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
            <GatsbyImage
              style={{
                filter: 'drop-shadow(.5px 0.5px 1px rgba(0, 0, 0, 0.35))',
              }}
              image={flag}
              alt={`${countryName} flag`}
            />
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
          </div>
        </ColumnSection>
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query CountryPage($iso3: String) {
    country: airtableDocuments(data: { ISO3: { eq: $iso3 } }) {
      data {
        Country_name
      }
    }
    flagData: airtableTrips(data: { ISO3: { eq: $iso3 } }) {
      flag {
        childrenImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 55, quality: 80)
        }
      }
    }
  }
`

export default CountryPage
