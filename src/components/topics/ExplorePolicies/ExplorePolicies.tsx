import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Dropdown from '@talus-analytics/library.ui.dropdown'

import ColumnSection from 'components/layout/ColumnSection'
import PaginationControls from './PaginationControls'

const H3 = styled.h3`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`
const DropdownButton = styled.button`
  ${({ theme }) => theme.bigParagraphMedium};
  border: none;
  background: ${({ theme }) => theme.veryLightGray};
  margin: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
`
const Flag = styled.img`
  width: 40px;
`

interface ExplorePoliciesProps {
  countryDocuments: Queries.TripsPageQuery['countryDocuments']
}

const ExplorePolicies = ({ countryDocuments }: ExplorePoliciesProps) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  // removing 'readonly' from the gatsby-generated type
  // so we can sort without typescript complaining
  type countriesMutable = {
    -readonly [key in keyof typeof countryDocuments.nodes[0]]: typeof countryDocuments.nodes[0][key]
  }
  const countries = countryDocuments.nodes as countriesMutable[]
  const sorted = countries.sort(
    (a, b) =>
      a.data?.Country_name?.localeCompare(b.data?.Country_name ?? '') ?? -1
  )

  const total = sorted.length
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <ColumnSection>
      <H3>Explore Policies</H3>
      <div>
        {paginated.map(country => (
          <Dropdown
            floating={false}
            renderButton={() => (
              <DropdownButton>
                <Flag
                  src={`https://flags.talusanalytics.com/shiny_100px/${country.data?.ISO_3166_1_alpha_2?.toLowerCase()}.png`}
                />
                {country.data?.Country_name}
              </DropdownButton>
            )}
          >
            {country.data?.All_applicable_countries_link?.map(document => (
              <Link to={`/documents/${document?.data?.Document_name}`}>
                {document?.data?.Document_name}
              </Link>
            ))}
          </Dropdown>
        ))}
        <PaginationControls
          {...{ page, setPage, pageSize, setPageSize, total }}
        />
      </div>
    </ColumnSection>
  )
}

export default ExplorePolicies
