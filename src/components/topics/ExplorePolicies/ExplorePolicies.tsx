import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import ColumnSection from 'components/layout/ColumnSection'

import Flag from 'components/ui/Flag'
import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'

import PaginationControls from './PaginationControls'

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
  countryDocuments: Queries.TripsPageQuery['countryDocuments']
  thumbnails: Queries.TripsPageQuery['thumbnails']
}

const ExplorePolicies = ({
  countryDocuments,
  thumbnails,
}: ExplorePoliciesProps) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  // map between document name and thumbnail data
  const thumbnailMap = useMemo(() => {
    return thumbnails.nodes.reduce(
      (obj, doc) => ({
        ...obj,
        [doc.data!.Document_name!]: doc.documentThumbnail?.[0],
      }),
      {}
    )
  }, [thumbnails])

  // removing 'readonly' from the gatsby-generated type
  // so we can sort without typescript complaining
  type countriesMutable = {
    -readonly [key in keyof typeof countryDocuments.nodes[0]]: typeof countryDocuments.nodes[0][key]
  }
  const countries = countryDocuments.nodes as countriesMutable[]

  const fuse = new Fuse(countries, {
    keys: ['data.Country_name', 'data.ISO3'],
  })

  let sorted: typeof countries

  if (searchTerm === '')
    sorted = countries.sort(
      (a, b) =>
        a.data?.Country_name?.localeCompare(b.data?.Country_name ?? '') ?? -1
    )
  else sorted = fuse.search(searchTerm).map(result => result.item)

  const total = sorted.length

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
        {sorted.map((country, index) => (
          <React.Fragment key={country.data?.ISO3}>
            {country.data?.ISO3 && (
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
                    <Flag country={country} />
                    {country.data?.Country_name}
                  </>
                }
              >
                {country.data.All_applicable_countries_link &&
                country.data.All_applicable_countries_link.length > 0 ? (
                  country.data?.All_applicable_countries_link?.map(document => (
                    <DocumentLink
                      key={document?.data?.Document_name}
                      document={document}
                      thumbnail={
                        thumbnailMap[
                          document?.data
                            ?.Document_name as keyof typeof thumbnailMap
                        ]
                      }
                    />
                  ))
                ) : (
                  <p>No document</p>
                )}
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
