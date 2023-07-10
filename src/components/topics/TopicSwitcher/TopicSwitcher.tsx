import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import ColumnSection from 'components/layout/ColumnSection'
import SubtopicDescription from './subtopicDescription'
import MapLegend from './SubtopicMap/MapLegend'
import SubtopicMap from './SubtopicMap/SubtopicMap'
import { CountryDocuments } from '../ExplorePolicies/restructureDocuments'
import ModalMessageProvider from 'components/ui/Modal/ModalMessageProvider'
import { CountryMetadata } from '../ExplorePolicies/restructureCountryMetadata'

export interface SubtopicContextProps {
  subtopicData: Queries.TopicPageQuery['subtopics']['nodes']
  subtopicIndex: number | null
  setSubtopicIndex: React.Dispatch<React.SetStateAction<number | null>>
  countryDocuments: CountryDocuments
  countryMetadata: CountryMetadata
}

export const SubtopicContext = createContext<SubtopicContextProps | null>(null)

const Column = styled.div`
  @media (max-width: 600px) {
    margin-left: -15px;
    margin-right: -15px;
    width: calc(100% + 30px);
  }
`

const NoGapColumnSection = styled(ColumnSection)`
  margin-top: 0;

  @media (max-width: 1300px) {
    gap: 0;
  }
`

interface TopicSwitcherProps {
  data: Queries.TopicPageQuery
  countryDocuments: CountryDocuments
  countryMetadata: CountryMetadata
}

const TopicSwitcher = ({
  data,
  countryDocuments,
  countryMetadata,
}: TopicSwitcherProps) => {
  if (!data) throw new Error('No subtopics found')

  const [subtopicIndex, setSubtopicIndex] = useState<number | null>(0)

  return (
    <SubtopicContext.Provider
      value={{
        subtopicData: data.subtopics.nodes,
        subtopicIndex,
        setSubtopicIndex,
        countryDocuments,
        countryMetadata,
      }}
    >
      <ModalMessageProvider>
        <ColumnSection columnReverse>
          <Column>
            <MapLegend />
          </Column>
          <Column>
            <SubtopicMap />
          </Column>
        </ColumnSection>
        <NoGapColumnSection noBorder>
          <span></span>
          <SubtopicDescription />
        </NoGapColumnSection>
      </ModalMessageProvider>
    </SubtopicContext.Provider>
  )
}

export default TopicSwitcher
