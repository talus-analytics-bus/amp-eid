import { Link } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import simplifyForUrl from 'utilities/simplifyForUrl'

const DocumentLink = styled(Link)`
  display: block;
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.link};

  &:hover {
    text-decoration: underline;
  }
`

interface DocumentLinkProps {
  document: {
    readonly data: {
      readonly Document_name: string | null
      readonly File_publish_date: readonly (string | null)[] | null
      readonly Authoring_country:
        | readonly ({
            readonly data: {
              readonly Country_name: string | null
            } | null
          } | null)[]
        | null
    } | null
    readonly documentThumbnail:
      | readonly ({
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          } | null
        } | null)[]
      | null
  }
}

const TruncatedDocumentLink = ({ document }: DocumentLinkProps) => {
  const documentName = document.data?.Document_name ?? ''
  const authoringCountryName =
    document.data?.Authoring_country?.[0]?.data?.Country_name ?? ''

  let displayName = documentName
  if (documentName && documentName.length > 46)
    displayName = documentName.slice(0, 46) + '...'
  return (
    <DocumentLink
      to={`/documents/${simplifyForUrl(authoringCountryName)}/${simplifyForUrl(
        documentName
      )}`}
    >
      {displayName}
    </DocumentLink>
  )
}

export default TruncatedDocumentLink
