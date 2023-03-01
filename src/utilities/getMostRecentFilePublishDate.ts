import parseAirtableDate from './parseDate'
import formatAirtableDate from './formatDate'

// return type from airtable for this property
type FilePublishDate = readonly (string | null)[] | null

export default (data: FilePublishDate) => {
  if (!data) return undefined

  const mostRecent = data
    .map(string => string && parseAirtableDate(string))
    .sort((a, b) => (!a || !b ? -1 : b.getTime() - a.getTime()))
    .at(0)

  if (mostRecent) return formatAirtableDate(mostRecent)

  return undefined
}
