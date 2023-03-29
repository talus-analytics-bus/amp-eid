import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Expression } from 'mapbox-gl'
import { SubtopicContextProps } from '../TopicSwitcher'

import camelCase from 'utilities/camelCase'

const useCountryLayer = ({
  subtopicIndex,
  subtopicData,
}: SubtopicContextProps) => {
  const theme = useTheme()

  const countryLayer = useMemo(() => {
    // select the subtopic
    const countryData =
      subtopicData[subtopicIndex ?? 0].data?.Subtopic_assign_status_link
    if (!countryData)
      throw new Error(`Country data not found for subtopic ${subtopicIndex}`)

    // creat a string array of [iso, color, iso, color] for all countries
    // to populate the mapbox fill-color match statement format
    const countryColorMatch: string[] = []
    for (const country of countryData) {
      const iso = country?.data?.Country?.[0]?.data?.ISO3
      const layer = country?.data?.Status_link?.[0]?.data?.Map_color

      if (layer && iso)
        countryColorMatch.push(
          iso,
          theme[camelCase(layer) as keyof typeof theme]
        )
      else
        console.log(`Country status not found for ${JSON.stringify(country)}`)
    }

    const countryLayer = {
      id: `countries-highlight`,
      type: `fill` as `fill`,
      source: `countries`,
      'source-layer': 'ne_10m_admin_0_countries-6llcvl',
      paint: {
        'fill-outline-color': 'white',
        // outline color for saving images from the map to use on the homepage
        // 'fill-outline-color': theme.ampEidDarkBlue,
        'fill-color': [
          'match',
          ['get', 'ADM0_ISO'],
          ...countryColorMatch,
          // last color in the array is the "default color"
          theme.option7,
          //
          // for making disabled map for homepage
          // theme.darkGray,
        ] as Expression,
      },
      beforeId: 'countries-outline',
    }

    return countryLayer
  }, [subtopicIndex, subtopicData, theme])

  return countryLayer
}

export default useCountryLayer
