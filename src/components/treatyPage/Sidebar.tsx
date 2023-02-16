import Thumbnail from 'components/ui/DocumentThumbnail'
import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const ThumbnailHolder = styled.div`
  background: ${({ theme }) => theme.lightGray};
  border-radius: 5px;
  padding: 20px;
  max-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonLink = styled.a`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  background: ${({ theme }) => theme.option3};
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  display: block;
`
const H4 = styled.h4`
  margin: 0;
  margin-top: 10px;
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
`
const Semibold = styled.p`
  margin: 0;
  ${({ theme }) => theme.paragraphSemibold};
  color: ${({ theme }) => theme.black};
`

const Sidebar = ({
  treatyData,
}: {
  treatyData: Queries.TreatyPageQuery['general']['nodes'][0]
}) => {
  const fileData = treatyData.data?.PDF?.localFiles?.[0]

  if (!fileData?.prettySize || !fileData.publicURL)
    throw new Error(
      `File metadata not found for treaty ${treatyData.data?.Document_name}`
    )

  const image =
    treatyData.documentThumbnail?.[0]?.childImageSharp?.gatsbyImageData

  if (!image)
    throw new Error(
      `Treaty ${treatyData.data?.Document_name} is missing thumbnail`
    )

  const openedForSignature = treatyData.data?.Date_opened_for_signature
  const originalPublication = treatyData.data?.Date_of_original_publication
  const latestUpdate = treatyData.data?.File_publish_date

  return (
    <Container>
      <ThumbnailHolder>
        <Thumbnail
          image={image}
          alt={treatyData.data?.Document_name + ' thumbnail'}
        />
      </ThumbnailHolder>
      <ButtonLink href={fileData.publicURL}>
        Download treaty ({fileData.ext.toUpperCase().replace('.', '')},{' '}
        {fileData.prettySize})
      </ButtonLink>
      {treatyData.data?.File_source_URL && (
        <ButtonLink href={treatyData.data?.File_source_URL}>
          Open link to treaty
        </ButtonLink>
      )}
      {openedForSignature && (
        <>
          <H4>Date opened for signature</H4>
          <Semibold>{openedForSignature}</Semibold>
        </>
      )}
      {originalPublication && (
        <>
          <H4>Date of original publication</H4>
          <Semibold>{originalPublication}</Semibold>
        </>
      )}
      {latestUpdate && (
        <>
          <H4>Latest update</H4>
          <Semibold>{latestUpdate}</Semibold>
        </>
      )}
    </Container>
  )
}

export default Sidebar
