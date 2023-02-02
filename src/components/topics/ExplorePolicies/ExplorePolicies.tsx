import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import Dropdown from '@talus-analytics/library.ui.dropdown'

import ColumnSection from 'components/layout/ColumnSection'
import PaginationControls from './PaginationControls'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import DocumentLink from './DocumentLink'

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
const DropdownContent = styled.div`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${({ theme }) => theme.veryLightGray};
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
          <React.Fragment key={country.data?.ISO_3166_1_alpha_3}>
            {country.data?.ISO_3166_1_alpha_3 && (
              <Dropdown
                floating={false}
                renderButton={() => (
                  <DropdownButton>
                    {country.flag?.childImageSharp?.gatsbyImageData && (
                      <GatsbyImage
                        image={country.flag.childImageSharp.gatsbyImageData}
                        alt={`${country.data?.Country_name} Flag`}
                      />
                    )}
                    {country.data?.Country_name}
                  </DropdownButton>
                )}
              >
                <DropdownContent>
                  {country.data?.All_applicable_countries_link?.map(
                    document => (
                      <DocumentLink {...{ document, thumbnailMap }} />
                    )
                  )}
                </DropdownContent>
              </Dropdown>
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