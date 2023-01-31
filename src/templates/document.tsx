import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Providers from 'components/layout/Providers'
import CMS from '@talus-analytics/library.airtable-cms'
import NavBar from 'components/layout/NavBar/NavBar'
import Main from 'components/layout/Main'
import MainHeader from 'components/layout/MainHeader'

const DocumentPage = ({
  data: { document },
}: PageProps<Queries.DocumentPageQuery>) => {
  if (!document?.data || !document.data.Document_name)
    throw new Error('All documents must have a unique document name.')
  return (
    <Providers>
      <CMS.SEO
        title={document.data.Document_name}
        description={
          `Applicable countries, metadata, and download ` +
          `links for ${document.data.Document_name}`
        }
      />
      <NavBar />
      <Main>
        <MainHeader>
          <h2>{document.data.Topic}</h2>
          <h1>{document.data.Document_name}</h1>
        </MainHeader>
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query DocumentPage($id: String) {
    document: airtableDocuments(id: { eq: $id }) {
      data {
        Topic
        Document_name
        Document_note
        All_applicable_countries {
          data {
            Country_name
            ISO_3166_1_alpha_3
          }
        }
        Attachment__most_recent_ {
          filename
        }
      }
    }
  }
`

export default DocumentPage
