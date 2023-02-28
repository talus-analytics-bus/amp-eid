import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import MobileMenu from './MobileMenu/MobileMenu'

import useIndexPageData from 'cmsHooks/useIndexPageData'
import NavbarDropdown from './NavbarDropdown'
import useShortTreatyNames from 'queryHooks/useShortTreatyNames'
import simplifyForUrl from 'utilities/simplifyForUrl'
import LinksList from './LinksList'
import CountrySearch from 'components/landing/CountrySearch'

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
const LinkList = styled.ul`
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
  @media (max-width: 950px) {
    display: none;
  }
`
const MobileLinkList = styled(LinkList)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
const NavLogo = styled(CMS.Image)`
  height: 50px;
  width: 525px;
  max-width: 60vw;
  margin-right: 30px;
`

const NavBar = () => {
  const data = useIndexPageData()
  const treaties = useShortTreatyNames()

  const links = [{ to: '/about/overview/', children: 'About' }]

  const topicsLinks = [
    {
      to: '/topics/trade-and-intellectual-property/',
      children: <CMS.Text name="Topic 1 text" data={data} />,
    },
    {
      to: '/topics/amr-animal-health',
      children: 'AMR Animal Health',
    },
    { to: '', children: 'Coming soon: Childhood vaccination', disabled: true },
    { to: '', children: 'Coming soon: Non-human vaccination', disabled: true },
  ]

  const treatyLinks = treaties.distinct.map(treaty => ({
    to: `/treaties/${simplifyForUrl(treaty)}`,
    children: treaty,
  }))

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
          <NavbarDropdown title="Topics">
            <LinksList links={topicsLinks} />
          </NavbarDropdown>
          <NavbarDropdown title="Treaties">
            <LinksList links={treatyLinks} />
          </NavbarDropdown>
          <NavbarDropdown title="Countries">
            <CountrySearch style={{ minWidth: 350, margin: '0' }} />
          </NavbarDropdown>
          {links.map(linkProps => (
            <Li key={linkProps.to}>
              <NavLink {...linkProps} />
            </Li>
          ))}
        </DesktopNavList>
        <MobileMenu>
          <MobileLinkList>
            <h3 style={{ color: 'white' }}>Topics</h3>
            <Li key={'trips'}>
              <NavLink to="/topics/trade-and-intellectual-property/">
                Trade and intellectual property
              </NavLink>
            </Li>
            <h3 style={{ color: 'white' }}>Treaties</h3>
            {treatyLinks.map(linkProps => (
              <Li key={linkProps.to}>
                <NavLink {...linkProps} />
              </Li>
            ))}
            <h3 style={{ color: 'white' }}>General</h3>
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
