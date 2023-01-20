// Adapted from
// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case

const camelCase = (str: string) =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())

export default camelCase
