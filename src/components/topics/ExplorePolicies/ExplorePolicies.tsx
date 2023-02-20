import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import ColumnSection from 'components/layout/ColumnSection'
import PaginationControls from './PaginationControls'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import DocumentLink from './DocumentLink'
import Flag from 'components/ui/Flag'
import ExploreDropdown from 'components/ui/ExploreDropdown'

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

export interface ThumbnailMap {
  [key: string]: IGatsbyImageData
}

const ExplorePolicies = ({
  countryDocuments,
  thumbnails,
}: ExplorePoliciesProps) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  // map between document name and thumbnail data
  const thumbnailMap: ThumbnailMap = useMemo(() => {
    return thumbnails.nodes.reduce(
      (obj, doc) => ({
        ...obj,
        [doc.data!.Document_name!]:
          doc.documentThumbnail?.[0]?.childImageSharp?.gatsbyImageData,
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
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize)

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
        {paginated.map(country => (
          <React.Fragment key={country.data?.ISO3}>
            {country.data?.ISO3 && (
              <ExploreDropdown
                label={
                  <>
                    <Flag country={country} />
                    {country.data?.Country_name}
                  </>
                }
              >
                {country.data?.All_applicable_countries_link?.map(document => (
                  <DocumentLink
                    key={document?.data?.Document_name}
                    {...{ document, thumbnailMap }}
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
