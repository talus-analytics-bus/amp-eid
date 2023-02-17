import React from 'react'
import styled from 'styled-components'

import ColumnSection from 'components/layout/ColumnSection'

import simplifyForUrl from 'utilities/simplifyForUrl'
import { Link } from 'gatsby'

const H3 = styled.h3`
  ${({ theme }) => theme.h2};
  color: ${({ theme }) => theme.black};
  margin: 0;
`
const TreatyLink = styled(Link)`
  ${({ theme }) => theme.bigParagraphMedium};
  border-radius: 5px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.veryLightGray};
  transition: 150ms ease;
  color: ${({ theme }) => theme.black};

  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    transition: 250ms ease;
  }
`

interface RelatedTreatiesProps {
  relatedTreaties: Queries.TripsPageQuery['relatedTreaties']['nodes']
}

const RelatedTreaties = ({ relatedTreaties }: RelatedTreatiesProps) => {
  return (
    <ColumnSection>
      <H3>Treaty</H3>
      <div>
        {relatedTreaties.map(treaty => {
          const shortName = treaty.data?.Treaty_short_name
          if (!shortName)
            throw new Error(
              `Trying to link Treaty ${treaty.data?.Document_name} but Treaty_short_name not found`
            )
          return (
            <TreatyLink
              key={treaty.data?.Document_name}
              to={`/treaties/${simplifyForUrl(treaty.data?.Treaty_short_name)}`}
            >
              {treaty.data?.Document_name}
            </TreatyLink>
          )
        })}
      </div>
    </ColumnSection>
  )
}

export default RelatedTreaties
