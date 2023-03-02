import BlueCircleIcon from 'components/ui/BlueCircleIcon'
import DocumentLink from 'components/ui/DocumentLink'
import ExploreDropdown from 'components/ui/ExploreDropdown'
import React, { useMemo } from 'react'
import restructureTopicDocuments from './restructureTopicDocuments'

export type Policies = Exclude<
  Exclude<Queries.CountryPageQuery['countryData'], null>['data'],
  null
>['All_applicable_countries_link']

interface CountryPoliciesProps {
  // prettier-ignore
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
