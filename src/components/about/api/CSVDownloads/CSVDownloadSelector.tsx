import React, { useState } from 'react'

import styled from 'styled-components'
import ButtonLink from 'components/ui/ButtonLink'
import DownloadIcon from 'components/ui/DownloadIcon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin-top: 20px;

  select {
    ${({ theme }) => theme.paragraphMedium};
    padding: 5px 15px;
  }
`

export interface CSVOptions {
  [key: string]: {
    name: string
    link: string
  }
}

interface CSVDownloadSelectorProps {
  options: CSVOptions
  defaultOption: keyof CSVOptions
}

const CSVDownloadSelector = ({
  options,
  defaultOption,
}: CSVDownloadSelectorProps) => {
  const [selected, setSelected] = useState(options[defaultOption])

  return (
    <Container>
      <select onChange={e => setSelected(options[e.target.value])}>
        {Object.values(options).map(option => (
          <option>{option.name}</option>
        ))}
      </select>
      <ButtonLink href={selected.link}>
        <DownloadIcon />
        Download topic data (CSV)
      </ButtonLink>
    </Container>
  )
}

export default CSVDownloadSelector
