import React from 'react'
import styled from 'styled-components'

import simplifyForUrl from 'utilities/simplifyForUrl'
import BlueCircleIcon from 'components/ui/BlueCircleIcon'
import GreyBoxLink from 'components/ui/GreyBoxLink'

const TreatiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
          <GreyBoxLink
            key={treaty.data?.Document_name}
            to={`/treaties/${simplifyForUrl(treaty.data?.Treaty_short_name)}`}
          >
            <BlueCircleIcon name="Treaty" size={40} />
            <span>{treaty.data?.Document_name}</span>
          </GreyBoxLink>
        )
      })}
    </TreatiesContainer>
  )
}

export default RelatedTreaties
