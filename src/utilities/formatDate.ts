const formatDate = (input: string | Date) => {
  if (typeof input === 'string') {
    input = new Date(input)
  }

  return input.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default formatDate
