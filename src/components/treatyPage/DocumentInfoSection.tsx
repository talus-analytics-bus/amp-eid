import React from 'react'
import styled from 'styled-components'

import { RenderCMSRichText } from '@talus-analytics/library.airtable.cms-rich-text'
import formatAirtableDate from 'utilities/formatDate'
import getMostRecentFilePublishDate from 'utilities/getMostRecentFilePublishDate'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

const Container = styled.div`
  background-color: ${({ theme }) => theme.veryLightGray};
  border-radius: 5px;
  padding: 0px 20px 20px 20px;
`
const MetadataTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;

  table {
    border-collapse: collapse;
  }

  & td {
    padding: 0;
    padding-bottom: 15px;
    vertical-align: top;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    div {
      margin-bottom: 10px;
    }

    strong {
      font-weight: normal;
      ${({ theme }) => theme.paragraphMedium};
      line-height: 28px;
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.black};
      font-weight: 100;

      &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.link};
      }
    }
  }

  td:nth-child(1) {
    text-align: right;
    ${({ theme }) => theme.paragraphMedium};
    line-height: 28px;
    // width: 11em;
  }
  td:nth-child(2) {
    ${({ theme }) => theme.paragraph};
    color: ${({ theme }) => theme.black};
    padding-left: 15px;
    line-height: 28px;
  }
  & tr:last-child > td {
    padding-bottom: 0;
  }
`

const Description = styled(RenderCMSRichText)`
  > p {
    margin-top: 30px 0 0 0;
    ${({ theme }) => theme.paragraph}
    color: ${({ theme }) => theme.black};

    > a {
      color: ${({ theme }) => theme.link};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

interface DocumentInfoSectionProps {
  document: Exclude<Queries.DocumentPageQuery['document'], null>
  treatyPage?: false | undefined
}

interface TreatyInfoSectionProps {
  document: Exclude<Queries.TreatyPageQuery['treaty'], null>
  treatyPage: true
}

const DocumentInfoSection = ({
  document: treatyData,
  treatyPage,
}: DocumentInfoSectionProps | TreatyInfoSectionProps) => {
  const fileData = treatyData.data?.PDF?.localFiles?.[0]

  if (treatyPage && !treatyData.data?.Document_description)
    throw new Error(
      `Document description not found for treaty ${treatyData.data?.Document_name}`
    )

  if (!fileData?.prettySize || !fileData.publicURL)
    throw new Error(
      `File metadata not found for document ${treatyData.data?.Document_name}`
    )

  const enteredIntoForce = treatyData.data?.Date_entered_into_force
  const originalPublication = treatyData.data?.Date_of_original_publication

  const latestUpdate = getMostRecentFilePublishDate(
    treatyData.data?.File_publish_date
  )

  const languages = []
  const languageList = treatyData?.data?.Language

  if (languageList) {
    for (const [index, language] of languageList.entries()) {
      const title = treatyData?.data?.Original_language_title?.[index]
      const link = treatyData?.data?.PDF?.localFiles?.[index]?.publicURL
      if (language && title && link) languages.push({ language, title, link })
    }
  }

  // handle document page specific metadata
  let applicableCountries, topics, subtopics, relevantArticles
  if (!treatyPage) {
    applicableCountries = treatyData?.data?.All_applicable_countries

    topics = treatyData.data?.Document_topic_link
    subtopics = treatyData.data?.Document_subtopic_link

    relevantArticles = treatyData.data?.Chaper__Section_or_Article?.trim()
  }

  return (
    <Container>
      {treatyData.data?.Document_description && (
        <Description markdown={treatyData.data?.Document_description} />
      )}
      <MetadataTable>
        <tbody>
          {applicableCountries && (
            <tr>
              <td>
                Applicable{' '}
                {applicableCountries.length === 1 ? 'country' : 'countries'}
              </td>
              <td>
                {applicableCountries.map((country, index) => (
                  <React.Fragment key={country?.data?.Country_name}>
                    {index > 0 && ' '}
                    <Link
                      to={`/countries/${simplifyForUrl(
                        country?.data?.Country_name ?? ''
                      )}`}
                    >
                      {country?.data?.Country_name}
                      {index < applicableCountries.length - 1 ? ',' : ''}
                    </Link>
                  </React.Fragment>
                ))}
              </td>
            </tr>
          )}
          {topics && !treatyPage && (
            <tr>
              <td>Topic</td>
              <td>
                {topics.map(topic =>
                  topic?.data?.Publish === true ? (
                    <Link
                      key={topic?.data?.Topic}
                      to={`/topics/${simplifyForUrl(topic?.data?.Topic ?? '')}`}
                    >
                      {topic?.data?.Topic}
                    </Link>
                  ) : (
                    <span key={topic?.data?.Topic}>{topic?.data?.Topic}</span>
                  )
                )}
              </td>
            </tr>
          )}
          {subtopics && !treatyPage && (
            <tr>
              <td>Subtopic</td>
              <td>
                {subtopics.map(topic => (
                  <div key={topic?.data?.Subtopic}>{topic?.data?.Subtopic}</div>
                ))}
              </td>
            </tr>
          )}
          {originalPublication && (
            <tr>
              <td>
                {treatyPage ? 'Opened for signature' : 'Original publication'}
              </td>
              <td>{formatAirtableDate(originalPublication)}</td>
            </tr>
          )}
          {enteredIntoForce && (
            <tr>
              <td>Entered into force</td>
              <td>{formatAirtableDate(enteredIntoForce)}</td>
            </tr>
          )}
          {latestUpdate && (
            <tr>
              <td>Latest update</td>
              <td>{latestUpdate}</td>
            </tr>
          )}
          {relevantArticles && !treatyPage && (
            <tr>
              <td>Relevant articles</td>
              <td>{relevantArticles}</td>
            </tr>
          )}

          <tr>
            <td>Available languages</td>
            <td style={{ paddingBottom: 0 }}>
              <table>
                <tbody>
                  {languages.map(language => (
                    <tr key={language.language}>
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

export default DocumentInfoSection
