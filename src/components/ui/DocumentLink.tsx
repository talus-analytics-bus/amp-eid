import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Thumbnail from 'components/ui/DocumentThumbnail'

import simplifyForUrl from 'utilities/simplifyForUrl'
import getMostRecentFilePublishDate from 'utilities/getMostRecentFilePublishDate'
import { IGatsbyImageData } from 'gatsby-plugin-image'

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
  } | null
}

const DocumentLink = ({ document }: DocumentLinkProps) => {
  if (!document) return <></>

  const name = document?.data?.Document_name

  const image =
    document.documentThumbnail?.at(0)?.childImageSharp?.gatsbyImageData

  const countryName = document?.data?.Authoring_country?.[0]?.data?.Country_name

  if (!name || !image || !countryName) {
    console.log(
      `Document ${name} is missing name, image, or authoring country name`
    )
    return <></>
  }

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
