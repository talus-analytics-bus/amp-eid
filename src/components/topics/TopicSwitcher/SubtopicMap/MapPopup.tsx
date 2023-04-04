import React, { useContext } from 'react'
import { LngLat } from 'mapbox-gl'
import { SubtopicContext } from '../TopicSwitcher'
import Flag from 'components/ui/Flag'
import styled, { useTheme } from 'styled-components'
import camelCase from 'utilities/camelCase'
import TruncatedDocumentLink from './TruncatedDocumentLink'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

const CountryName = styled(Link)`
  position: relative;
  ${({ theme }) => theme.h3};
  border-bottom: 1px solid ${({ theme }) => theme.darkGray};
  padding-bottom: 10px;
  padding-right: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.ampEidDarkBlue};

  &:hover {
    text-decoration: underline;
  }
`
const MapKey = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  ${({ theme }) => theme.paragraph};
`
const MapStatusName = styled.div`
  ${({ theme }) => theme.labels};
`
const ColorBlock = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  margin-top: 0.15em;
  width: 23px;
  // height: 20px;
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
export interface PopupState {
  iso: string
  lnglat: LngLat
}

interface MapPopupProps {
  popupState: PopupState | null
  setPopupState: React.Dispatch<React.SetStateAction<PopupState | null>>
}

const MapPopup = ({ popupState }: MapPopupProps) => {
  const { subtopicData, subtopicIndex, countryDocuments } =
    useContext(SubtopicContext)!

  const theme = useTheme()

  if (!popupState) return <></>

  console.log({ popupState })

  const subtopic = subtopicData[subtopicIndex ?? 0]

  const statusLink = subtopic.data?.Subtopic_assign_status_link?.find(
    status => status?.data?.Country?.[0]?.data?.ISO3 === popupState.iso
  )

  const map_color = statusLink?.data?.Status_link?.[0]?.data?.Map_color
  const countryName = statusLink?.data?.Country?.[0]?.data?.Country_name

  console.log(subtopic)

  const documents = countryDocuments[countryName ?? '']

  const statusDesciption = subtopic.data?.Subtopic_define_status_link?.find(
    status_link => status_link?.data?.Map_color === map_color
  )

  const color = map_color && theme[camelCase(map_color) as keyof typeof theme]
  // const countryName = documents?.country?.data?.Country_name

  // if (!countryName) return <></>

  return (
    <>
      <CountryName to={`/countries/${simplifyForUrl(countryName ?? '')}`}>
        {documents && <Flag country={documents.country} style={{ top: -3 }} />}
        {countryName}
      </CountryName>
      {documents && countryName && (
        <>
          <MapKey>
            <ColorBlock
              style={{
                backgroundColor: color ?? theme.option7,
                position: 'relative',
                top: -2,
              }}
            />
            <MapStatusName>{statusDesciption?.data?.Status}</MapStatusName>
          </MapKey>
          <StatusDescription>
            {statusDesciption?.data?.Status_description}
          </StatusDescription>
        </>
      )}
      {documents && documents.documents.length > 0 && (
        <>
          <SeeDocumentHeader>See document:</SeeDocumentHeader>
          {documents.documents.map(document => (
            <TruncatedDocumentLink
              key={document.data?.Document_name}
              document={document}
            />
          ))}
        </>
      )}
    </>
  )
}

export default MapPopup
