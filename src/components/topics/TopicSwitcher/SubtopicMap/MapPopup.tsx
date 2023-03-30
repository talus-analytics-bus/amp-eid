import React, { useContext } from 'react'
import { LngLat } from 'mapbox-gl'
import { Popup } from 'react-map-gl'
import { SubtopicContext } from '../TopicSwitcher'
import Flag from 'components/ui/Flag'
import styled, { useTheme } from 'styled-components'
import camelCase from 'utilities/camelCase'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

const CountryName = styled.div`
  position: relative;
  ${({ theme }) => theme.h3};
  border-bottom: 1px solid ${({ theme }) => theme.darkGray};
  padding-bottom: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`
const MapKey = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.paragraph};
`
const ColorBlock = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  margin-top: 0.15em;
  width: 20px;
  height: 20px;
`
const StatusDescription = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.darkGray};
  margin-top: 15px;
`
const SeeDocumentHeader = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.black};
  margin-top: 15px;
  margin-bottom: 5px;
`
const DocumentLink = styled(Link)`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.link};
`

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

  const theme = useTheme()

  if (!popupState) return <></>

  const subtopic = subtopicData[subtopicIndex ?? 0]
  const documents = countryDocuments[popupState.iso]

  const map_color = subtopic.data?.Subtopic_assign_status_link?.find(
    status => status?.data?.Country?.[0]?.data?.ISO3 === popupState.iso
  )?.data?.Status_link?.[0]?.data?.Map_color

  const statusDesciption = subtopic.data?.Subtopic_define_status_link?.find(
    status_link => status_link?.data?.Map_color === map_color
  )

  const color = map_color && theme[camelCase(map_color) as keyof typeof theme]

  console.log(documents)

  return (
    <Popup
      closeOnClick={false}
      onClose={() => setPopupState(null)}
      latitude={popupState.lnglat.lat}
      longitude={popupState.lnglat.lng}
      style={{ maxWidth: '400px' }}
    >
      {documents && (
        <>
          <CountryName>
            <Flag country={documents.country} style={{ top: -3 }} />
            {documents.country?.data?.Country_name}
          </CountryName>
          <MapKey>
            <ColorBlock
              style={{
                backgroundColor: color ?? 'white',
                position: 'relative',
                top: -1,
              }}
            />
            {statusDesciption?.data?.Status}
          </MapKey>
          <StatusDescription>
            {statusDesciption?.data?.Status_description}
          </StatusDescription>
          <SeeDocumentHeader>See document:</SeeDocumentHeader>
          {documents.documents.map(document => (
            <DocumentLink
              to={`/documents/${simplifyForUrl(
                document.data?.Authoring_country?.[0]?.data?.Country_name ?? ''
              )}/${simplifyForUrl(document.data?.Document_name ?? '')}`}
            >
              {document.data?.Document_name}
            </DocumentLink>
          ))}
        </>
      )}
    </Popup>
  )
}

export default MapPopup
