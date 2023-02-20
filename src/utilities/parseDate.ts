// Date format coming out of airtable is
// YYYY-MM-DD

// we want to parse this into local time
// so that the day is always the same
// no matter where the browsers' locale is

const parseAirtableDate = (input: string) => {
  const c = input.split('-').map(c => Number(c))
  return new Date(c[0], c[1] - 1, c[2])
}

export default parseAirtableDate
