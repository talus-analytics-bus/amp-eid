import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import LinksList from './LinksList'
import MobileMenu from './MobileMenu/MobileMenu'
import NavbarDropdown from './NavbarDropdown'
import MobileMenuDropdown from './MobileMenu/MobileMenuDropdown'
import NavBarCountrySearch from './NavBarCountrySearch'

import useTopics from 'queryHooks/useTopics'
import simplifyForUrl from 'utilities/simplifyForUrl'
import useIndexPageData from 'cmsHooks/useIndexPageData'
import useShortTreatyNames from 'queryHooks/useShortTreatyNames'

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
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
const NavLink = styled(Link)`
  color: white !important;
  padding: 14px;
  text-decoration: none;
  transition: 500ms ease;
  font-weight: 400;
  &:hover {
    color: ${({ theme }) => theme.ampEidLightBlue2};
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

  @media (max-width: 600px) {
    margin-left: 10px;
  }
`
const DesktopNavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  @media (max-width: 1200px) {
    display: none;
  }
`
const NavLogo = styled(CMS.Image)`
  height: 50px;
  width: 525px;
  max-width: 65vw;
  margin-right: 30px;

  @media (max-width: 600px) {
    margin-right: 15px;
  }
`

const NavBar = () => {
  const data = useIndexPageData()

  const topics = useTopics()
  const topicsLinks = topics.map(({ data }) => ({
    to: `/topics/${simplifyForUrl(data?.Topic ?? '')}/`,
    children: data?.Topic ?? '',
    disabled: data?.Disable ?? false,
  }))
  const treaties = useShortTreatyNames()
  const treatyLinks = treaties.map(treaty => ({
    to: `/treaties/${simplifyForUrl(treaty)}`,
    children: treaty,
  }))

  const aboutLinks = [
    { to: '/about/overview/', children: 'Overview' },
    { to: '/about/methods/', children: 'Methods' },
    { to: '/about/api/', children: 'Data & API' },
    { to: '/about/user-guide/', children: 'User guide' },
  ]

  return (
    <Nav>
      <Container>
        <HomeLink to="/">
          <NavLogo
            imgStyle={{ objectFit: 'contain' }}
            name="Site logo"
            data={data}
          />
        </HomeLink>
        <DesktopNavList>
          <NavbarDropdown title="Topics">
            <LinksList links={topicsLinks} />
          </NavbarDropdown>
          <NavbarDropdown title="Treaty library">
            <LinksList links={treatyLinks} />
          </NavbarDropdown>
          <NavbarDropdown title="About">
            <LinksList links={aboutLinks} />
          </NavbarDropdown>
          <NavBarCountrySearch style={{ minWidth: 250, margin: '0' }} />
        </DesktopNavList>
        <MobileMenu>
          <MobileMenuDropdown title="Topics">
            <LinksList
              $darkMode
              links={topicsLinks.filter(topic => !topic.disabled)}
            />
          </MobileMenuDropdown>
          <MobileMenuDropdown title="Treaty library">
            <LinksList $darkMode links={treatyLinks} />
          </MobileMenuDropdown>
          <MobileMenuDropdown title="About">
            <LinksList $darkMode links={aboutLinks} />
          </MobileMenuDropdown>
          <NavBarCountrySearch style={{ width: '100%', margin: '0' }} />
        </MobileMenu>
      </Container>
    </Nav>
  )
}

export default NavBar
