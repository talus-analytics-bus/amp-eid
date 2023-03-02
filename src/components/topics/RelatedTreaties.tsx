import React from 'react'
import styled from 'styled-components'

import simplifyForUrl from 'utilities/simplifyForUrl'
import { Link } from 'gatsby'
import BlueCircleIcon from 'components/ui/BlueCircleIcon'

const TreatiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TreatyLink = styled(Link)`
  ${({ theme }) => theme.bigParagraphMedium};
  border-radius: 5px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.veryLightGray};
  transition: 150ms ease;
  color: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  gap: 0.5em;

  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    transition: 250ms ease;
  }
`

interface RelatedTreatiesProps {
  relatedTreaties: Queries.TopicPageQuery['relatedTreaties']['nodes']
}

const RelatedTreaties = ({ relatedTreaties }: RelatedTreatiesProps) => {
  return (
    <TreatiesContainer>
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
            <BlueCircleIcon name="Treaty" size={40} />
            {treaty.data?.Document_name}
          </TreatyLink>
        )
      })}
    </TreatiesContainer>
  )
}

export default RelatedTreaties
