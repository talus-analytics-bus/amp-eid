export interface CountryMetadata {
  [key: string]: Queries.TopicPageQuery['countryMetadata']['nodes'][number]
}

const restructureCountryMetadata = (
  countryMetadata: Queries.TopicPageQuery['countryMetadata']
) => {
  const countryObj: CountryMetadata = {}

  for (const country of countryMetadata.nodes) {
    if (!country.data?.ISO3) continue
    countryObj[country.data?.ISO3] = country
  }

  return countryObj
}

export default restructureCountryMetadata
