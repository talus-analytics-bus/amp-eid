import React, { useContext, useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { SubtopicContext } from '../TopicSwitcher'

import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import camelCase from 'utilities/camelCase'

const mapboxKey = process.env.GATSBY_MAPBOX_API_KEY

if (!mapboxKey)
  throw new Error(
    'Mapbox-gl-js API key must be set in ' +
      'GATSBY_MAPBOX_API_KEY environment variable'
  )

mapboxgl.accessToken = mapboxKey

const MapSection = styled.section`
  position: relative;
  flex-grow: 1;
  display: flex;
  height: 32vw;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${({ theme }) => theme.veryLightGray};
`
const MapContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
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

  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<null | mapboxgl.Map>(null)

  useEffect(() => {
    // don't mount map if ref is null or map is already mounted
    let map = mapRef.current
    if (!mapContainer.current || map) return

    console.time('Compute layers')
    const countryData = subtopicData[subtopicIndex ?? 0].data?.Assign_status
    if (!countryData)
      throw new Error(`Country data not found for subtopic ${subtopicIndex}`)

    const layers = countryData.reduce((layers, country) => {
      const iso = country?.data?.Country?.[0]?.data?.ISO_3166_1_alpha_3?.trim()
      const layer = country?.data?.Status_link?.[0]?.data?.Map_color

      if (!layer || !iso)
        throw new Error(
          `Country status not found for ${JSON.stringify(country)}`
        )

      if (!layers[layer]) layers[layer] = [iso]
      else layers[layer].push(iso)

      return layers
    }, {} as { [key: string]: string[] })
    console.timeEnd('Compute layers')

    console.time('Mount map')
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/ryan-talus/clddahzv7007j01qbgn0bba8w',
      // style: { version: 8, sources: {}, layers: [] },
      projection: { name: 'naturalEarth' },
      maxZoom: 5,
      minZoom: 0,
      maxBounds: [
        [-180, -80],
        [180, 80],
      ],
    })

    map.fitBounds(
      [
        [160, -60],
        [180, 90],
      ],
      { padding: 30 }
    )
    console.timeEnd('Mount map')

    map.on('load', () => {
      console.time('Add sources and layers')
      if (!map) return
      map.addSource('countries', {
        type: 'vector',
        url: 'mapbox://ryan-talus.0h741z23',
      })

      map.addLayer(
        {
          id: 'countries-fill',
          type: 'fill',
          source: 'countries',
          'source-layer': 'ne_10m_admin_0_countries-6llcvl',
          paint: {
            'fill-outline-color': 'white',
            'fill-color': theme.option7,
          },
        },
        'country-label'
      )

      // map.addLayer(
      //   {
      //     id: 'countries-stroke',
      //     type: 'line',
      //     source: 'countries',
      //     'source-layer': 'ne_10m_admin_0_countries-6llcvl',
      //     paint: {
      //       'line-color': 'white',
      //       'line-width': 0.5,
      //     },
      //   },
      //   'country-label'
      // )

      Object.entries(layers).map(([color, countries]) => {
        map!.addLayer(
          {
            id: `countries-highlight-${color}`,
            type: 'fill',
            source: 'countries',
            'source-layer': 'ne_10m_admin_0_countries-6llcvl',
            paint: {
              'fill-outline-color': 'white',
              'fill-color': theme[camelCase(color) as keyof typeof theme],
            },
            filter: ['in', 'ADM0_ISO', ...countries],
          },
          'country-label'
        )
      })
      console.timeEnd('Add sources and layers')
    })

    return () => {
      if (!map) return
      map.getStyle().layers.forEach(layer => {
        map!.removeLayer(layer.id)
      })
    }
  }, [theme, subtopicData, subtopicIndex])

  return (
    <MapSection>
      <MapTitle>{subtopicData[subtopicIndex ?? 0].data?.Subtopic}</MapTitle>
      <MapContainer ref={mapContainer} />
    </MapSection>
  )
}

export default SubtopicMap
