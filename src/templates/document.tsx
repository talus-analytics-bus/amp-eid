import * as React from 'react'
import { graphql, PageProps } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import Providers from 'components/layout/Providers'
import NavBar from 'components/layout/NavBar/NavBar'
import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'
import Thumbnail from 'components/ui/DocumentThumbnail'
import ApplicableCountries from 'components/documentPage/RelatedCountries'
import ColumnSection from 'components/layout/ColumnSection'
import ThumbnailHolder from 'components/ui/ThumbnailHolder'
import DocumentMetadata from 'components/documentPage/DocumentMetadata'

const DocumentPage = ({
  data: { document },
}: PageProps<Queries.DocumentPageQuery>) => {
  const name = document?.data?.Document_name

  const downloadUrl = document?.data?.PDF?.localFiles?.[0]?.publicURL

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
          <h2>{document.data.Document_subtitle}</h2>
          <ApplicableCountries
            countries={document.data.All_applicable_countries}
          />
        </MainHeader>
        <ColumnSection>
          <div>
            <ThumbnailHolder>
              <Thumbnail image={image} alt={name + ' thumbnail'} />
            </ThumbnailHolder>
            <h4>Download</h4>
            <a href={downloadUrl}>{name}</a>
          </div>
          <div>
            <DocumentMetadata document={document} />
            <iframe
              title="document preview"
              src={downloadUrl}
              style={{ height: '80vh', width: '100%' }}
            />
          </div>
        </ColumnSection>
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
        Document_subtitle
        Date_entered_into_force
        Date_of_original_publication
        File_publish_date
        Chaper__Section_or_Article
        Document_note
        All_applicable_countries {
          data {
            Country_name
            ISO3
          }
        }
        Language
        Original_language_title
        PDF {
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
