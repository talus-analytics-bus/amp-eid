import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Thumbnail from 'components/ui/DocumentThumbnail'

import simplifyForUrl from 'utilities/simplifyForUrl'
import getMostRecentFilePublishDate from 'utilities/getMostRecentFilePublishDate'

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 20px 0;
  margin-left: 75px;
  margin-right: 75px;
  border-top: 1px solid ${({ theme }) => theme.medGray};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.black};
  }
`
const Metadata = styled.div`
  padding: 0 15px;
`
const Name = styled.div`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
`
const DateText = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
`

interface DocumentLinkProps {
  document: Exclude<
    Queries.TopicPageQuery['topicDocuments']['nodes'][number],
    null
  >
}

const DocumentLink = ({ document }: DocumentLinkProps) => {
  const name = document?.data?.Document_name
  if (!name) throw new Error('Document missing name')

  const image =
    document.documentThumbnail?.at(0)?.childImageSharp?.gatsbyImageData

  if (!image) throw new Error(`Document ${name} missing thumbnail`)
  const countryName = document?.data?.Authoring_country?.[0]?.data?.Country_name
  if (!countryName)
    throw new Error(`Document ${name} missing authoring country`)

  const date = getMostRecentFilePublishDate(document.data.File_publish_date)

  return (
    <StyledLink
      key={name}
      to={`/documents/${simplifyForUrl(countryName)}/${simplifyForUrl(name)}`}
    >
      {image && <Thumbnail image={image} alt={`${name} thumbnail`} />}
      <Metadata>
        <DateText>{date}</DateText>
        <Name>{name}</Name>
      </Metadata>
    </StyledLink>
  )
}

export default DocumentLink
