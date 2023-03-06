import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Link } from 'gatsby'

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin: 0;
  padding: 0 0 30px 0;
  border-bottom: 3px solid ${({ theme }) => theme.lightGray};
`

const PaddedLink = styled(Link)`
  ${({ theme }) => theme.h3};
  padding: 8px 20px 3px 20px;
  background-color: white;
  border-radius: 10px;
  transition: 150ms ease;
  color: ${({ theme }) => theme.black};
`

const AboutNav = (): JSX.Element => {
  const theme = useTheme()

  return (
    <LinkList>
      <li>
        <PaddedLink
          activeStyle={{ background: theme.ampEidLightBlue2 }}
          to="/about/overview/"
        >
          Overview
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{ background: theme.ampEidLightBlue2 }}
          to="/about/downloads-and-citations/"
        >
          Downloads and citations
        </PaddedLink>
      </li>
      <li>
        <PaddedLink
          activeStyle={{ background: theme.ampEidLightBlue2 }}
          to="/about/methods/"
        >
          Methods
        </PaddedLink>
      </li>
    </LinkList>
  )
}
export default AboutNav
