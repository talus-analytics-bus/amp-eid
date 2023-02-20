import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'
import React from 'react'
import styled from 'styled-components'

const CountryPolicies = ({ trips }: Queries.CountryPageQuery) => {
  return (
    <>
      {trips && (
        <ExploreDropdown label={<>Trade and intellectual property</>}>
          {trips.data?.All_applicable_countries_link?.map(document => (
            <DocumentLink
              key={document?.data?.Document_name}
              document={document}
              thumbnail={document?.documentThumbnail?.[0]}
            />
          ))}
        </ExploreDropdown>
      )}
    </>
  )
}

export default CountryPolicies
