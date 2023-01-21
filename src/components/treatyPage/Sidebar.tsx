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
    </Container>
  )
}

export default Sidebar
