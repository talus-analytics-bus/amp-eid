// Adapted from
// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case

function camelCase(str: string): string
function camelCase(str: string | undefined | null): string | undefined | null {
  if (typeof str === 'undefined') return undefined
  if (str === null) return null
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}

export default camelCase
