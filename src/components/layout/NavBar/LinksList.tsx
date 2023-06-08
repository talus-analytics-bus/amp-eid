import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const TopicList = styled.ul`
  list-style: none;
  padding: 5px 0px;
  margin: 0;
`
const Li = styled.li`
  display: block;
  width: 100%;
`
const DropdownLink = styled(Link)<{ darkMode?: boolean }>`
  display: block;
  width: 100%;
  max-width: 80vw;
  padding: 10px 15px;
  color: ${({ theme }) => theme.black};
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme, darkMode }) =>
      darkMode ? theme.ampEidDarkBlue : theme.ampEidLightBlue2};
  }
`
const ComingSoon = styled.span`
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`

interface LinksListProps {
  links: {
    to: string
    children: React.ReactNode
    disabled?: boolean
  }[]
  darkMode?: boolean
}

const LinksList = ({ links, darkMode }: LinksListProps) => (
  <TopicList>
    {links.map(link => (
      <Li key={link.to}>
        {link.disabled ? (
          <ComingSoon>{link.children}</ComingSoon>
        ) : (
          <DropdownLink {...link} darkMode={darkMode} />
        )}
      </Li>
    ))}
  </TopicList>
)

export default LinksList
