import * as React from 'react'
import { graphql, PageProps } from 'gatsby'

const DocumentPage = ({
  data: { document },
}: PageProps<Queries.DocumentPageQuery>) => {
  console.log(document)
  return <h1>{document?.data?.Document_name}</h1>
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
