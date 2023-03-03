import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import useIndexPageData from 'cmsHooks/useIndexPageData'

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 67px;
  left: 0;
`
const BackgroundImage = styled(CMS.Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
`
const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.27) 0%,
    rgba(255, 255, 255, 0.794688) 57.81%,
    #ffffff 100%
  );
`

const Background = () => {
  const cmsData = useIndexPageData()

  return (
    <BackgroundContainer>
      <BackgroundImage name="Top image" data={cmsData} />
      <Gradient />
    </BackgroundContainer>
  )
}

export default Background
