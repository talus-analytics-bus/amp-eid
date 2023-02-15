import Thumbnail from 'components/ui/DocumentThumbnail'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import simplifyForUrl from 'utilities/simplifyForUrl'

import { ThumbnailMap } from './ExplorePolicies'

interface DocumentLinkProps {
  document?: {
    data?: {
      Document_name?: string | null
      File_publish_date?: string | null
    } | null
  } | null
  thumbnailMap: ThumbnailMap
}

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

const DocumentLink = ({ document, thumbnailMap }: DocumentLinkProps) => {
  const name = document?.data?.Document_name
  if (!name) throw new Error('Document missing name')

  let dateStrings = document?.data?.File_publish_date
  let date = ''

  if (dateStrings) {
    const mostRecent = dateStrings
      .split(',')
      .map(string => new Date(string))
      .sort((a, b) => b.getTime() - a.getTime())
      .at(0)

    if (mostRecent)
      date = mostRecent.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
  }

  const image = thumbnailMap[name]

  return (
    <StyledLink key={name} to={`/documents/${simplifyForUrl(name)}`}>
      {image && <Thumbnail image={image} alt={`${name} thumbnail`} />}
      <Metadata>
        <DateText>{date}</DateText>
        <Name>{name}</Name>
      </Metadata>
    </StyledLink>
  )
}

export default DocumentLink
