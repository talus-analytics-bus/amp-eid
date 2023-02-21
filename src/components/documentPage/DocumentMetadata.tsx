import React from 'react'
import styled from 'styled-components'

import formatAirtableDate from 'utilities/formatDate'
import parseAirtableDate from 'utilities/parseDate'

const Container = styled.div`
  background-color: ${({ theme }) => theme.veryLightGray};
  border-radius: 5px;
  padding: 0px 20px 30px 20px;
`
const MetadataTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;

  & td {
    padding-bottom: 15px;
    vertical-align: top;

    div {
      margin-bottom: 10px;
    }

    a {
      // display: block;
      text-decoration: none;
      color: ${({ theme }) => theme.black};
      font-weight: 100;

      strong {
        font-weight: 500;
      }

      &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.link};
      }
    }
  }

  td:nth-child(1) {
    text-align: right;
    width: 11em;
  }
  td:nth-child(2) {
    ${({ theme }) => theme.paragraphMedium};
    color: ${({ theme }) => theme.black};
    padding-left: 15px;
  }
`

const DocumentMetadata = ({ document }: Queries.DocumentPageQuery) => {
  const fileDates = document?.data?.File_publish_date

  const mostRecent =
    fileDates &&
    fileDates
      .map(string => parseAirtableDate(string!))
      .sort((a, b) => b.getTime() - a.getTime())
      .at(0)

  const dates = {
    'Latest update': mostRecent,
    'Entered into force': document?.data?.Date_entered_into_force,
    'Original publication': document?.data?.Date_of_original_publication,
  }

  const text = {
    'Relevant articles': document?.data?.Chaper__Section_or_Article,
    Note: document?.data?.Document_note,
  }

  const languages = []
  const languageList = document?.data?.Language

  if (languageList) {
    for (const [index, language] of languageList.entries()) {
      const title = document?.data?.Original_language_title?.[index]
      const link = document?.data?.PDF?.localFiles?.[index]?.publicURL
      if (language && title && link) languages.push({ language, title, link })
    }
  }

  return (
    <Container>
      <MetadataTable>
        <tbody>
          {Object.entries(dates).map(
            ([label, date]) =>
              date && (
                <tr>
                  <td>{label}</td>
                  <td>{formatAirtableDate(date)}</td>
                </tr>
              )
          )}
          {Object.entries(text).map(
            ([label, text]) =>
              text && (
                <tr>
                  <td>{label}</td>
                  <td>{text}</td>
                </tr>
              )
          )}
          <tr>
            <td>Available languages</td>
            <td>
              <table>
                <tbody>
                  {languages.map(language => (
                    <tr>
                      <td style={{ textAlign: 'left', width: 'min-content' }}>
                        <strong style={{}}>{language.language} </strong>
                      </td>
                      <td>
                        <a href={language.link}>{language.title}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </MetadataTable>
    </Container>
  )
}

export default DocumentMetadata
