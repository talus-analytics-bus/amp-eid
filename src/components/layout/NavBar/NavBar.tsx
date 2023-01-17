import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import MobileMenu from './MobileMenu/MobileMenu'

import useIndexPageData from 'cmsHooks/useIndexPageData'

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.ampEidColor};
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.24);
  border-bottom: 1px solid black;
`
const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`
const LinkList = styled.ol`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`
const Li = styled.li`
  display: flex;
`
const NavLink = styled(Link)`
  color: white !important;
  padding: 14px;
  text-decoration: none;
  transition: 500ms ease;
  font-weight: 400;
  &:hover {
    transition: 150ms ease;
    text-decoration: none !important;
    color: ${({ theme }) => theme.lightAmpColor} !important;
  }
`
const HomeLink = styled(NavLink)`
  font-family: 'Overpass', sans-serif !important;
  font-weight: 500 !important;
  font-size: 24px !important;
  color: white;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
`
const DesktopNavList = styled(LinkList)`
  @media (max-width: 599px) {
    display: none;
  }
`
const MobileLinkList = styled(LinkList)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.ampEidColor};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
const NavLogo = styled(CMS.Image)`
  height: 50px;
  width: 525px;
  margin-right: 30px;
`

const NavBar = () => {
  const data = useIndexPageData()

  const links = [
    { to: '/topics/', children: 'Topics' },
    { to: '/treaties/', children: 'Treaties' },
    { to: '/countries/', children: 'Countries' },
    { to: '/overview/', children: 'About' },
  ]

  return (
    <Nav>
      <Container>
        <LinkList>
          <HomeLink to="/">
            <NavLogo
              imgStyle={{ objectFit: 'contain' }}
              name="Site logo"
              data={data}
            />
          </HomeLink>
        </LinkList>
        <DesktopNavList>
          {links.map(linkProps => (
            <Li key={linkProps.to}>
              <NavLink {...linkProps} />
            </Li>
          ))}
        </DesktopNavList>
        <MobileMenu>
          <MobileLinkList>
            {links.map(linkProps => (
              <Li key={linkProps.to}>
                <NavLink {...linkProps} />
              </Li>
            ))}
          </MobileLinkList>
        </MobileMenu>
      </Container>
    </Nav>
  )
}

export default NavBar
