import React, { useContext } from 'react'
import styled, { useTheme } from 'styled-components'
import { SubtopicContext } from '../TopicSwitcher'
import Map, { Layer, LayerProps, Source } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import camelCase from 'utilities/camelCase'

const mapboxAccessToken = process.env.GATSBY_MAPBOX_API_KEY

if (!mapboxAccessToken)
  throw new Error(
    'Mapbox-gl-js API key must be set in ' +
      'GATSBY_MAPBOX_API_KEY environment variable'
  )

const MapSection = styled.section`
  position: relative;
  flex-grow: 1;
  display: flex;
  aspect-ratio: 16/10;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${({ theme }) => theme.veryLightGray};
`
const MapTitle = styled.h3`
  ${({ theme }) => theme.h3};
  color: ${({ theme }) => theme.black};
  margin: 0;
  padding: 10px 20px;
`

const SubtopicMap = () => {
  const theme = useTheme()
  const context = useContext(SubtopicContext)

  if (!context) throw new Error('SubtopicMap must be inside SubtopicContext')
  const { subtopicIndex, subtopicData } = context

  // select the subtopic
  const countryData = subtopicData[subtopicIndex ?? 0].data?.Assign_status
  if (!countryData)
    throw new Error(`Country data not found for subtopic ${subtopicIndex}`)

  // creat a string array of [iso, color, iso, color] for all countries
  // to populate the mapbox fill-color match statement format
  const countryColorMatch: string[] = []
  for (const country of countryData) {
    const iso = country?.data?.Country?.[0]?.data?.ISO_3166_1_alpha_3
    const layer = country?.data?.Status_link?.[0]?.data?.Map_color

    if (layer && iso)
      countryColorMatch.push(iso, theme[camelCase(layer) as keyof typeof theme])
    else console.log(`Country status not found for ${JSON.stringify(country)}`)
  }

  const dataLayer: LayerProps = {
    id: `countries-highlight`,
    type: `fill`,
    source: `countries`,
    'source-layer': 'ne_10m_admin_0_countries-6llcvl',
    paint: {
      'fill-outline-color': 'white',
      'fill-color': [
        'match',
        ['get', 'ADM0_ISO'],
        ...countryColorMatch,
        // last color is the "default color"
        theme.option7,
      ],
    },
    beforeId: 'country-label',
  }

  return (
    <MapSection>
      <MapTitle>{subtopicData[subtopicIndex ?? 0].data?.Subtopic}</MapTitle>
      <Map
        // map style is just the labels when you zoom in
        mapStyle="mapbox://styles/ryan-talus/clddahzv7007j01qbgn0bba8w"
        mapboxAccessToken={mapboxAccessToken}
        projection="naturalEarth"
        initialViewState={{
          longitude: 0,
          latitude: 15,
          zoom: 1,
        }}
        maxZoom={5}
        minZoom={1}
      >
        {/* This source provides country shapes and their ISO codes */}
        <Source id="my-data" type="vector" url="mapbox://ryan-talus.0h741z23">
          {/* This layer paints all colors including grey background color */}
          <Layer key={dataLayer.id} {...dataLayer} />
        </Source>
      </Map>
    </MapSection>
  )
}

export default SubtopicMap
