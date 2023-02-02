import ColumnSection from 'components/layout/ColumnSection'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

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

interface RelatedTreatyProps {
  relatedTreaties: Queries.TripsPageQuery['relatedTreaties']
}

const RelatedTreaty = ({ relatedTreaties }: RelatedTreatyProps) => {
  return (
    <ColumnSection>
      <H3>Treaty</H3>
      <div>
        {relatedTreaties.nodes.map(treaty => (
          <TreatyLink
            key={treaty.data?.Document_name}
            to={`/treaties/${treaty.data?.Treaty_short_name}`}
          >
            {treaty.data?.Document_name}
          </TreatyLink>
        ))}
      </div>
    </ColumnSection>
  )
}

export default RelatedTreaty
