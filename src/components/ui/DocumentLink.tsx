import { Link } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import formatAirtableDate from 'utilities/formatDate'
import parseAirtableDate from 'utilities/parseDate'
import simplifyForUrl from 'utilities/simplifyForUrl'
import Thumbnail from 'components/ui/DocumentThumbnail'

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
    data: {
      Document_name: string | null
      File_publish_date: string | null
      Authoring_country:
        | {
            data?: {
              Country_name: string | null
            } | null
          }[]
        | null
    } | null
  } | null
  thumbnail:
    | {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        } | null
      }
    | null
    | undefined
}

const DocumentLink = ({ document, thumbnail }: DocumentLinkProps) => {
  const name = document?.data?.Document_name
  if (!name) throw new Error('Document missing name')
  const image = thumbnail?.childImageSharp?.gatsbyImageData
  if (!image) throw new Error(`Document ${name} missing thumbnail`)
  const countryName = document?.data?.Authoring_country?.[0]?.data?.Country_name
  if (!countryName)
    throw new Error(`Document ${name} missing authoring country`)

  const dateStrings = document?.data?.File_publish_date
  let date = ''

  if (dateStrings) {
    const mostRecent = dateStrings
      .split(',')
      .map(string => parseAirtableDate(string))
      .sort((a, b) => b.getTime() - a.getTime())
      .at(0)

    if (mostRecent) date = formatAirtableDate(mostRecent)
  }

  return (
    <StyledLink
      key={name}
      to={`/documents/${simplifyForUrl(countryName)}/${simplifyForUrl(name)}`}
    >
      {thumbnail && <Thumbnail image={image} alt={`${name} thumbnail`} />}
      <Metadata>
        <DateText>{date}</DateText>
        <Name>{name}</Name>
      </Metadata>
    </StyledLink>
  )
}

export default DocumentLink
