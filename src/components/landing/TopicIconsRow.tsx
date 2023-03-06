import React from 'react'
import styled, { useTheme } from 'styled-components'

import BlueCircleIcon from 'components/ui/BlueCircleIcon'

import useTopics from 'queryHooks/useTopics'
import { Link } from 'gatsby'
import simplifyForUrl from 'utilities/simplifyForUrl'

const IconsRow = styled.div`
  display: flex;
  max-width: 780px;
  margin: 80px auto 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px;
  gap: 5px;
`
const StyledLink = styled(Link)`
  display: block;
`

const iconStyle = {
  padding: '9px',
}

const TopicIconsRow = (): JSX.Element => {
  const topics = useTopics()
  const theme = useTheme()

  return (
    <IconsRow>
      {topics.map(
        topic =>
          topic.data?.Topic &&
          (topic.data.Disable ? (
            <BlueCircleIcon
              key={topic.data.Topic}
              name={topic.data.Topic}
              bgColor={theme.medDarkGray}
              style={iconStyle}
              size={72}
            />
          ) : (
            <StyledLink
              key={topic.data.Topic}
              to={`/topics/${simplifyForUrl(topic.data.Topic)}`}
            >
              <BlueCircleIcon
                key={topic.data.Topic}
                name={topic.data.Topic}
                style={iconStyle}
                size={72}
              />
            </StyledLink>
          ))
      )}
    </IconsRow>
  )
}

export default TopicIconsRow
