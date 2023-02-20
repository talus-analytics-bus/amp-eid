const simplifyForUrl = (string: string) =>
  string.replace(/[\/ ]/g, '-').replace(/[,.]/g, '').toLowerCase()

export default simplifyForUrl
