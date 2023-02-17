import parseAirtableDate from './parseDate'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const formatAirtableDate = (input: string | Date) => {
  if (typeof input === 'string') {
    input = parseAirtableDate(input)
  }

  return `${input.getDate()} ${
    monthNames[input.getMonth()]
  } ${input.getFullYear()}`
}

export default formatAirtableDate
