import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import ColumnSection from 'components/layout/ColumnSection'

import Flag from 'components/ui/Flag'
import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'

import PaginationControls from './PaginationControls'
import { CountryDocuments } from './restructureDocuments'
import { CountryMetadata } from './restructureCountryMetadata'

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
  countryMetadata: CountryMetadata
}

const ExplorePolicies = ({
  countryDocuments,
  countryMetadata,
}: ExplorePoliciesProps) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  const countriesList = useMemo(
    () =>
      Object.entries(countryDocuments)
        .map(([_, v]) => ({
          ...v,
          country: { ...countryMetadata[v.country?.data?.ISO3 ?? ''] },
        }))
        .sort(
          (a, b) =>
            a.country.data?.Country_name?.localeCompare(
              b.country.data?.Country_name ?? ''
            ) ?? -1
        ),
    [countryDocuments, countryMetadata]
  )

  let displayCountries = countriesList

  const fuse = new Fuse(displayCountries, {
    keys: ['country.data.Country_name', 'country.data.ISO3'],
  })

  if (searchTerm !== '')
    displayCountries = fuse.search(searchTerm).map(result => result.item)

  const total = displayCountries.length

  return (
    <ColumnSection rowReverse>
      <div>
        <H3>Explore policies</H3>
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
          <React.Fragment key={data.country?.data?.ISO3}>
            {data?.country?.data?.ISO3 && (
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
                    {data.country?.data?.Country_name}
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
