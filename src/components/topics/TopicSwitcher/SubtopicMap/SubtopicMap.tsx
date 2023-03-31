import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { SubtopicContext } from '../TopicSwitcher'
import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  NavigationControl,
} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import useCountryLayer from './useCountryLayer'
import MapPopup, { PopupState } from './MapPopup'
import useModal from 'components/ui/Modal/useModal'
import MapBottomCornerModal from './MapBottomCornerModal'

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
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`
const MapContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: ${({ theme }) => theme.veryLightGray};
  border-radius: 5px;
  overflow: hidden;
`
// const MapTitle = styled.h3`
//   ${({ theme }) => theme.bigParagraph};
//   color: ${({ theme }) => theme.black};
//   margin: 0;
//   padding: 10px 20px;
//   margin-bottom: 10px;
// `

const outlineLayer = {
  id: `countries-outline`,
  type: `line` as `line`,
  source: `countries`,
  'source-layer': 'ne_10m_admin_0_countries-6llcvl',
  paint: {
    'line-color': 'rgb(65, 101, 131)',
    'line-width': 1,
  },
  beforeId: 'country-label',
}

const selectedLayer = {
  id: `countries-selected`,
  type: `line` as `line`,
  source: `countries`,
  'source-layer': 'ne_10m_admin_0_countries-6llcvl',
  paint: {
    'line-color': 'rgb(65, 101, 131)',
    'line-width': 2,
  },
  beforeId: 'country-label',
}

const SubtopicMap = () => {
  const [hoveredISO, setHoveredISO] = React.useState('')
  const [popupState, setPopupState] = React.useState<PopupState | null>(null)
  const setModal = useModal()

  const context = useContext(SubtopicContext)
  if (!context) throw new Error('SubtopicMap must be inside SubtopicContext')

  const countryLayer = useCountryLayer(context)

  const onHover = useCallback(
    (event: MapLayerMouseEvent) =>
      setHoveredISO(event.features?.[0]?.properties?.ADM0_ISO ?? ''),
    []
  )

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const iso = event.features?.[0]?.properties?.ADM0_ISO

      if (!iso || !event.lngLat) {
        setPopupState(null)
        return
      }

      if (window.innerWidth <= 900) {
        setPopupState(null)
        setModal(
          <MapPopup
            popupState={{ iso, lnglat: event.lngLat }}
            {...{ setPopupState }}
          />,
          { closeable: true }
        )
        return
      }

      setPopupState({
        iso,
        lnglat: event.lngLat,
      })
    },
    [setModal]
  )

  return (
    <MapSection>
      {
        // <MapTitle>
        //   {context.subtopicData[context.subtopicIndex ?? 0].data?.Subtopic}
        // </MapTitle>
      }
      <MapContainer>
        <Map
          // map style is just the labels when you zoom in
          mapStyle="mapbox://styles/ryan-talus/clddahzv7007j01qbgn0bba8w"
          mapboxAccessToken={mapboxAccessToken}
          projection="naturalEarth"
          // projection="mercator"
          onMouseMove={onHover}
          onClick={onClick}
          interactiveLayerIds={[countryLayer.id]}
          initialViewState={{
            longitude: 0,
            latitude: 15,
            zoom: 0,
            // these bounds are weird due to a bug in mapbox with non-mercator projections:
            // https://github.com/mapbox/mapbox-gl-js/issues/11284
            bounds: [
              [350, 70],
              [-90, -45],
            ],
          }}
          maxZoom={5}
          minZoom={0}
          // easy way to dump the canvas content as PNG to use on the homepage
          // onLoad={map => {
          //   const content = map.target.getCanvas().toDataURL()
          //   console.log(content)
          // }}
        >
          {console.log(popupState)}
          {/* This source provides country shapes and their ISO codes */}
          <Source id="my-data" type="vector" url="mapbox://ryan-talus.0h741z23">
            {/* This layer paints all colors including grey background color */}
            <Layer
              key={outlineLayer.id}
              {...outlineLayer}
              filter={['==', 'ADM0_ISO', hoveredISO]}
            />
            <Layer
              key={selectedLayer.id}
              {...selectedLayer}
              filter={['==', 'ADM0_ISO', popupState?.iso ?? '']}
            />
            <Layer key={countryLayer.id} {...countryLayer} />
          </Source>
          {
            // <MapPopup {...{ popupState, setPopupState }} />
          }
          {popupState && (
            <MapBottomCornerModal>
              <MapPopup {...{ popupState, setPopupState }} />
            </MapBottomCornerModal>
          )}
          <NavigationControl position="top-left" showCompass={false} />
        </Map>
      </MapContainer>
    </MapSection>
  )
}

export default SubtopicMap
