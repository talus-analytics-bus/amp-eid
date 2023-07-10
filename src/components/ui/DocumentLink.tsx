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
    text-decoration: none;

    > div > div {
      text-decoration: none;
    }

    > div > div:nth-child(2) {
      color: ${({ theme }) => theme.link};
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
    gap: 10px;
  }
`
const Metadata = styled.div`
  padding: 0 15px;
`
const Name = styled.div`
  ${({ theme }) => theme.bigParagraph};
  color: ${({ theme }) => theme.black};
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`
const DateText = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
`
const Subtopics = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > span {
    display: block;

    &:not(:last-child)::after {
      position: relative;
      content: '•';
      padding: 5px;
      // background-color: ${({ theme }) => theme.veryDarkGray};
      border-radius: 50%;
    }
  }
`

interface DocumentLinkProps {
  document: {
    readonly data: {
      readonly Document_name: string | null
      readonly File_publish_date: readonly (string | null)[] | null
      readonly Document_subtopic_link:
        | readonly ({
            readonly data: {
              readonly Subtopic: string | null
            } | null
          } | null)[]
        | null
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
        <Subtopics>
          {document.data.Document_subtopic_link?.map(subtopic => (
            <span key={subtopic?.data?.Subtopic}>
              {subtopic?.data?.Subtopic}
            </span>
          ))}
        </Subtopics>
      </Metadata>
    </StyledLink>
  )
}

export default DocumentLink
