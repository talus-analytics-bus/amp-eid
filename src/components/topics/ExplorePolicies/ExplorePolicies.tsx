import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import ColumnSection from 'components/layout/ColumnSection'

import Flag from 'components/ui/Flag'
import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'

import PaginationControls from './PaginationControls'
import restructureDocuments, {
  CountriesObj as CountryDocuments,
} from './restructureDocuments'

const H3 = styled.h3`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`
const Label = styled.label`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.black};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
`
const Search = styled.input`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 5px;
`

interface ExplorePoliciesProps {
  countryDocuments: CountryDocuments
}

const ExplorePolicies = ({ countryDocuments }: ExplorePoliciesProps) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  const countriesList = useMemo(
    () =>
      Object.entries(countryDocuments)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([_, v]) => v),
    [countryDocuments]
  )

  let displayCountries = countriesList

  const fuse = new Fuse(displayCountries, {
    keys: ['country.data.Country_name', 'country.data.ISO3'],
  })

  if (searchTerm !== '')
    displayCountries = fuse.search(searchTerm).map(result => result.item)

  const total = displayCountries.length

  return (
    <ColumnSection>
      <div>
        <H3>Explore Policies</H3>
        <Label>
          Country
          <Search
            type="search"
            placeholder="Find a country"
            value={searchTerm}
            onChange={e => {
              setPage(0)
              setSearchTerm(e.target.value)
            }}
          />
        </Label>
      </div>
      <div>
        {displayCountries.map((data, index) => (
          <React.Fragment key={data.country?.data?.Country_name}>
            {data?.country?.data?.Country_name && (
              <ExploreDropdown
                style={{
                  display:
                    index >= page * pageSize &&
                    index < page * pageSize + pageSize
                      ? 'block'
                      : 'none',
                }}
                label={
                  <>
                    <Flag country={data.country} />
                    {data.country.data.Country_name}
                  </>
                }
              >
                {data.documents.map(document => (
                  <DocumentLink
                    key={document?.data?.Document_name}
                    document={document}
                  />
                ))}
              </ExploreDropdown>
            )}
          </React.Fragment>
        ))}
        <PaginationControls
          {...{ page, setPage, pageSize, setPageSize, total }}
        />
      </div>
    </ColumnSection>
  )
}

export default ExplorePolicies
