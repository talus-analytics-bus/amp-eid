import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const TopicList = styled.ul`
  color: ${({ theme }) => theme.black};
  list-style: none;
  padding: 5px 0px;
  min-width: 400px;
`
const Li = styled.li`
  display: block;
  width: 100%;
`
const DropdownLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 5px 15px;
  background-color: white;
  color: ${({ theme }) => theme.black};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.ampEidLightBlue2};
    background-color: rgb(236, 239, 243);
  }
`
const ComingSoon = styled.span`
  display: block;
  width: 100%;
  padding: 5px 15px;
  background-color: white;
  color: ${({ theme }) => theme.black};
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
}

const LinksList = ({ links }: LinksListProps) => (
  <TopicList>
    {links.map(link => (
      <Li key={link.to}>
        {link.disabled ? (
          <ComingSoon>{link.children}</ComingSoon>
        ) : (
          <DropdownLink {...link} />
        )}
      </Li>
    ))}
  </TopicList>
)

export default LinksList
