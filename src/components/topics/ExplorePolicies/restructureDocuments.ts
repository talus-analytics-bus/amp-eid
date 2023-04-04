type TopicDocuments = Queries.TopicPageQuery['topicDocuments']
type TopicDocument = TopicDocuments['nodes'][number]

export interface CountryDocuments {
  // prettier-ignore
  [key: string]: {
    country:
      Exclude<
        Exclude<
          Exclude<
            TopicDocument, null
          >['data'], null
        >['All_applicable_countries'], null
      >[number]

    documents: Exclude<TopicDocument[], null>
  }
}

const restructureDocuments = (topicDocuments: TopicDocuments) => {
  const countriesObj: CountryDocuments = {}

  for (const document of topicDocuments.nodes) {
    const countries = document.data?.All_applicable_countries
    if (!countries) break

    for (const country of countries) {
      if (!country?.data?.Country_name) break

      if (!countriesObj[country.data.Country_name])
        countriesObj[country.data.Country_name] = {
          country,
          documents: [document],
        }
      else countriesObj[country.data.Country_name].documents.push(document)
    }
  }
  console.log(countriesObj)
  return countriesObj
}

export default restructureDocuments
