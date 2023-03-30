import React, { useContext } from 'react'
import { LngLat } from 'mapbox-gl'
import { Popup } from 'react-map-gl'
import { SubtopicContext } from '../TopicSwitcher'
import Flag from 'components/ui/Flag'

export interface PopupState {
  iso: string
  lnglat: LngLat
}

interface MapPopupProps {
  popupState: PopupState | null
  setPopupState: React.Dispatch<React.SetStateAction<PopupState | null>>
}

const MapPopup = ({ popupState, setPopupState }: MapPopupProps) => {
  const { subtopicData, subtopicIndex, countryDocuments } =
    useContext(SubtopicContext)!
  if (!popupState) return <></>

  const subtopic = subtopicData[subtopicIndex ?? 0]
  const documents = countryDocuments[popupState.iso]

  console.log({ subtopic, documents })

  return (
    <Popup
      closeOnClick={false}
      onClose={() => setPopupState(null)}
      latitude={popupState.lnglat.lat}
      longitude={popupState.lnglat.lng}
    >
      {documents && (
        <>
          <Flag country={documents.country} />
          {documents.country?.data?.Country_name}
          {
            subtopic.data?.Subtopic_assign_status_link?.find(
              status =>
                status?.data?.Country?.[0]?.data?.ISO3 === popupState.iso
            )?.data?.Status_link?.[0]?.data?.Map_color
          }
        </>
      )}
    </Popup>
  )
}

export default MapPopup
