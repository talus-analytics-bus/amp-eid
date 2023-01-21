import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.lightGray};
  border-radius: 5px;
`
const ButtonLink = styled.a`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  background: ${({ theme }) => theme.option3};
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`
const Thumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
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
  const fileData = treatyData.data?.Attachments?.localFiles?.[0]

  if (!fileData?.prettySize || !fileData.publicURL)
    throw new Error(
      `File metadata not found for treaty ${treatyData.data?.Document_name}`
    )

  const openedForSignature = treatyData.data?.Date_opened_for_signature
  const originalPublication = treatyData.data?.Date_of_original_publication
  const latestUpdate = treatyData.data?.Date_of_latest_update

  return (
    <Container>
      <Thumbnail
        src={
          treatyData.data?.Attachments?.raw?.[0]?.thumbnails?.large?.url ?? ''
        }
      />
      <ButtonLink href={fileData.publicURL}>
        Download treaty ({fileData.ext.toUpperCase().replace('.', '')},{' '}
        {fileData.prettySize})
      </ButtonLink>
      {treatyData.data?.Document_URL && (
        <ButtonLink href={treatyData.data?.Document_URL}>
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
