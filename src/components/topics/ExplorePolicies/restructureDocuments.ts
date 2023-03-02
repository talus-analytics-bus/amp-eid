type TopicDocuments = Queries.TopicPageQuery['topicDocuments']
type TopicDocument = TopicDocuments['nodes'][number]

interface CountriesObj {
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
  const countriesObj: CountriesObj = {}

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
  const countriesList = Object.entries(countriesObj).sort((a, b) =>
    a[0].localeCompare(b[0])
  )
  return countriesList.map(([_, v]) => v)
}

export default restructureDocuments
