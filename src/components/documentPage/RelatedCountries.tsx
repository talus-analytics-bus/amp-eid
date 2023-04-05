import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import simplifyForUrl from 'utilities/simplifyForUrl'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const Country = styled(Link)`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.ampEidLightBlue2};
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`

interface ApplicableCountriesProps {
  countries:
    | readonly ({
        readonly data: {
          readonly Country_name: string | null
        } | null
      } | null)[]
    | null
}

const ApplicableCountries = ({ countries }: ApplicableCountriesProps) => (
  <Container>
    {countries?.map(
      country =>
        country?.data?.Country_name && (
          <Country
            to={`/countries/${simplifyForUrl(country?.data?.Country_name)}`}
            key={country?.data?.Country_name}
          >
            {country?.data?.Country_name}
          </Country>
        )
    )}
  </Container>
)

export default ApplicableCountries
