import ButtonLink from 'components/ui/ButtonLink'
import Thumbnail from 'components/ui/DocumentThumbnail'
import ThumbnailHolder from 'components/ui/ThumbnailHolder'
import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Sidebar = ({
  treatyData,
}: {
  treatyData: Exclude<Queries.TreatyPageQuery['treaty'], null>
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
      {
        // {treatyData.data?.File_source_URL && (
        //   <ButtonLink href={treatyData.data.File_source_URL}>
        //     Open link to treaty
        //   </ButtonLink>
        // )}
      }
    </Container>
  )
}

export default Sidebar
