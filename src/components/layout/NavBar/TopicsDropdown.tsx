import React from 'react'
import Dropdown from '@talus-analytics/library.ui.dropdown'
import styled from 'styled-components'
import { Link } from 'gatsby'
import useIndexPageData from 'cmsHooks/useIndexPageData'
import CMS from '@talus-analytics/library.airtable-cms'

const Container = styled.div`
  position: relative;
`
const DropdownButton = styled.button`
  ${({ theme }) => theme.paragraph};
  border: none;
  background: none;
  color: ${({ theme }) => theme.white};
  padding: 14px;
`
const TopicList = styled.ul`
  color: ${({ theme }) => theme.black};
  list-style: none;
  padding: 5px 0px;
  min-width: 350px;
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

const TopicsDropdown = () => {
  const indexPageCMSData = useIndexPageData()

  return (
    <Container>
      <Dropdown
        hover
        renderButton={() => <DropdownButton>Topics</DropdownButton>}
        expanderStyle={{ right: 0, top: 42, borderRadius: 5 }}
      >
        <TopicList>
          <Li>
            <DropdownLink to="/topics/trips/">
              <CMS.Text name="TRIPS text" data={indexPageCMSData} />
            </DropdownLink>
          </Li>
          <Li>
            <ComingSoon>Coming soon: Childhood vaccination</ComingSoon>
            <ComingSoon>Coming soon: Non-human vaccination</ComingSoon>
          </Li>
        </TopicList>
      </Dropdown>
    </Container>
  )
}

export default TopicsDropdown
