import React, { useMemo } from 'react'

import BlueCircleIcon from 'components/ui/BlueCircleIcon'
import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'

import restructureTopicDocuments from './restructureTopicDocuments'

export type Policies =
  // prettier-ignore
  Exclude<
    Exclude<
      Queries.CountryPageQuery['countryData'], null
    >['data'], null
  >['All_applicable_countries_link']

interface CountryPoliciesProps {
  policies: Policies
}

const CountryPolicies = ({ policies }: CountryPoliciesProps) => {
  const topicsList = useMemo(
    () => restructureTopicDocuments(policies),
    [policies]
  )

  return (
    <>
      {topicsList.map(
        topic =>
          topic.topic?.data?.Topic && (
            <ExploreDropdown
              key={topic.topic?.data?.Topic}
              label={
                <>
                  <BlueCircleIcon name={topic.topic.data.Topic} size={40} />
                  {topic.topic?.data?.Topic}
                </>
              }
            >
              {topic.documents.map(document => (
                <DocumentLink
                  key={document?.data?.Document_name}
                  document={document}
                />
              ))}
            </ExploreDropdown>
          )
      )}
    </>
  )
}

export default CountryPolicies
