import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Country = styled.div`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.ampEidLightBlue2};
  border-radius: 5px;
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
    {countries?.map(country => (
      <Country>{country?.data?.Country_name}</Country>
    ))}
  </Container>
)

export default ApplicableCountries
