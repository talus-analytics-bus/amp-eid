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

const formatDate = (input: string | Date) => {
  if (typeof input === 'string') {
    input = new Date(input)
  }

  return `${input.getDay()} ${
    monthNames[input.getMonth()]
  } ${input.getFullYear()}`
}

export default formatDate
