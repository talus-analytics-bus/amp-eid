import config from '../../gatsby-config'

const getTrackingId = () => {
  // find plugin config for GA
  const gaPluginConfig = config.plugins!.find(
    p => typeof p !== 'string' && p.resolve === `gatsby-plugin-gtag`
  )
  const trackingId =
    typeof gaPluginConfig !== 'string' &&
    gaPluginConfig?.options &&
    (gaPluginConfig.options.trackingId as string)

  if (!trackingId) return undefined
  // if GA not yet configured, return undefined
  if (trackingId === 'G-XXXXXXXXXX') return undefined

  return trackingId
}

export default getTrackingId
