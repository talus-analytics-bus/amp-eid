import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Providers from 'components/layout/Providers'
import CMS from '@talus-analytics/library.airtable-cms'
import NavBar from 'components/layout/NavBar/NavBar'
import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'
import Thumbnail from 'components/ui/DocumentThumbnail'

const DocumentPage = ({
  data: { document },
}: PageProps<Queries.DocumentPageQuery>) => {
  const name = document?.data?.Document_name

  const downloadUrl =
    document?.data?.Attachment_most_recent?.localFiles?.[0]?.publicURL

  const image =
    document?.documentThumbnail?.[0]?.childImageSharp?.gatsbyImageData

  if (!document?.data || !name)
    throw new Error('All documents must have a document name.')

  if (!downloadUrl) throw new Error(`File "${name}" is missing download link.`)

  if (!image) throw new Error(`File "${name}" is missing thumbnail image.`)

  return (
    <Providers>
      <CMS.SEO
        title={name}
        description={`Applicable countries, metadata, and download links for ${name}`}
      />
      <NavBar />
      <Main>
        <MainHeader>
          <h2>{document.data.Topic}</h2>
          <h1>{name}</h1>
        </MainHeader>
        <Thumbnail image={image} alt={name + ' thumbnail'} />
        <h4>Download</h4>
        <a href={downloadUrl}>{name}</a>
        <iframe
          title="document preview"
          src={downloadUrl}
          style={{ height: '80vh', width: '100%' }}
        />
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query DocumentPage($recordId: String) {
    document: airtableDocuments(recordId: { eq: $recordId }) {
      recordId
      rowIndex
      data {
        Topic
        Document_name
        All_applicable_countries {
          data {
            Country_name
            ISO3
          }
        }
        Attachment_most_recent {
          localFiles {
            publicURL
            prettySize
            ext
          }
        }
      }
      documentThumbnail {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED)
        }
      }
    }
  }
`

export default DocumentPage
