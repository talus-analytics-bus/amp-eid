import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import useStatesPartiesDefinitionQuery from 'cmsHooks/useStatesPartiesDefinition'

const Container = styled(CMS.RichText)`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
`

const StatesPartiesDefinitions = () => {
  const statesPartiesDefinitionsData = useStatesPartiesDefinitionQuery()

  return (
    <Container
      name="States parties definitions"
      data={statesPartiesDefinitionsData}
    />
  )
}

export default StatesPartiesDefinitions
