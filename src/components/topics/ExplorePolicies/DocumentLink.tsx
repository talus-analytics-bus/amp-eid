import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

import { ThumbnailMap } from './ExplorePolicies'

interface DocumentLinkProps {
  document?: {
    data?: {
      Document_name?: string | null
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
`
const Thumbnail = styled(GatsbyImage)`
  flex-shrink: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 2px;
`
const Metadata = styled.div`
  padding: 0 15px;
`
const Name = styled.div`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
`

const DocumentLink = ({ document, thumbnailMap }: DocumentLinkProps) => {
  const name = document?.data?.Document_name
  if (!name) throw new Error('Document missing name')
  const image = thumbnailMap[name]

  console.log(document)

  return (
    <StyledLink key={name} to={`/documents/${name}`}>
      {image && <Thumbnail image={image} alt={`${name} thumbnail`} />}
      <Metadata>
        <Name>{name}</Name>
      </Metadata>
    </StyledLink>
  )
}

export default DocumentLink
