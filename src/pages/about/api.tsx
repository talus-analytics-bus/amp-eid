import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import Main from 'components/layout/Main'
import NavBar from 'components/layout/NavBar/NavBar'
import AboutNav from 'components/about/AboutNav'
import Providers from 'components/layout/Providers'

import Footer from 'components/layout/Footer'
import ExploreDropdown from 'components/ui/ExploreDropdown'
import Dropdown from '@talus-analytics/library.ui.dropdown'
import useAboutDownloadAndCitationsPageData from 'cmsHooks/useAboutDownloadAndCitationsQuery'
import routes, {
  SchemaArray,
  SchemaObject,
  SchemaObjectTypes,
  SchemaString,
} from 'components/about/api/apiSchema'

const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  max-width: 1000px;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
`
const ItalicParagraph = styled.p`
  color: ${({ theme }) => theme.black};
  ${({ theme }) => theme.paragraph};
  font-style: italic;
  max-width: 970px;
  font-size: 20px;
  padding: 15px;
`
const H1 = styled.h1`
  ${({ theme }) => theme.h1}
  color: ${({ theme }) => theme.black};
`
const TextHeader2 = styled.h2`
  ${({ theme }) => theme.h2}
  color: ${({ theme }) => theme.black};
`
const H2 = styled.h2`
  ${({ theme }) => theme.bigParagraph}
  color: ${({ theme }) => theme.black};
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
`
const Routes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`
const Path = styled.div`
  ${({ theme }) => theme.bigParagraph}
  color: ${({ theme }) => theme.black};
  margin-right: auto;
`
const RouteName = styled.div`
  ${({ theme }) => theme.bigParagraph}
  color: ${({ theme }) => theme.darkGray};
  margin-left: auto;
`
const Method = styled.div`
  padding: 5px 10px;
  background: ${({ theme }) => theme.ampEidLightBlue};
  border: 1px solid ${({ theme }) => theme.ampEidMedBlue};
  ${({ theme }) => theme.bigParagraphSemibold}
  color: ${({ theme }) => theme.ampEidDarkBlue};
  border-radius: 5px;
`
const H3 = styled.h3`
  ${({ theme }) => theme.paragraphItalic}
  color: ${({ theme }) => theme.darkGray};
  margin-bottom: 0px;
`
const Example = styled.pre`
  background: black;
  color: white;
  border-radius: 5px;
  max-height: 300px;
  overflow: scroll;
  padding: 15px;
`
const RouteContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`

const StyledLink = styled.a`
  color: ${({ theme }) => theme.link};
`

const SchemaSection = styled.div`
  font-family: monospace;
  font-size: 14px;
`
const SchemaButton = styled.button`
  background: none;
  border: none;
  padding: none;
  padding: 3px 5px;
  font-size: 16px;
  font-family: monospace;
`
const Type = styled.p`
  margin: 0;
  padding-left: 10px;
`
const Definition = styled.p`
  margin: 0;
  padding-left: 10px;
  margin-top: 10px;
`
const Properties = styled.p`
  margin: 0;
  padding-left: 10px;
`
const Children = styled.div`
  padding: 10px;
  margin: 10px;
  padding-top: 0;
  border-left: 1px solid ${({ theme }) => theme.ampEidDarkBlue};
`

const RenderChild = ({
  name,
  data,
}: {
  name: string
  data: SchemaArray | SchemaObject | SchemaString
}) => {
  switch (data.type) {
    case SchemaObjectTypes.Array:
      return <RenderArray {...{ name, data }} />
    case SchemaObjectTypes.Object:
      return <RenderObject {...{ data }} />
    case SchemaObjectTypes.String:
      return <RenderString {...{ data }} />
  }
}

const RenderArray = ({ name, data }: { name: string; data: SchemaArray }) => (
  <>
    <Definition>Definition: {data.definition}</Definition>
    <Type>Type: {data.type}</Type>
    <Children>
      <RenderChild name={name} data={data.items} />
    </Children>
  </>
)

const RenderObject = ({ data }: { data: SchemaObject }) => (
  <>
    <Definition>Definition: {data.definition}</Definition>
    <Type>Type: {data.type}</Type>
    <Properties>Properties:</Properties>
    <Children>
      {Object.entries(data.properties).map(([name, data]) => (
        <Dropdown
          key={name}
          floating={false}
          renderButton={open => (
            <SchemaButton>
              {open ? '— ' : '+ '}
              {name}
            </SchemaButton>
          )}
        >
          <RenderChild {...{ name, data }} />
        </Dropdown>
      ))}
    </Children>
  </>
)

const RenderString = ({ data }: { data: SchemaString }) => (
  <div style={{ margin: '5px 0px 10px 15px' }}>
    <Definition>Definition: {data.definition}</Definition>
    <Type>Type: {data.type}</Type>
  </div>
)

const APIPage = (): JSX.Element => {
  const cmsData = useAboutDownloadAndCitationsPageData()

  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>
          <CMS.Text name="H2" data={cmsData} />
        </H1>
        <Paragraph>
          <CMS.Text name="Bottom paragraph" data={cmsData} />
        </Paragraph>
        <ItalicParagraph>
          <CMS.Text name="CGHSS paragraph" data={cmsData} />
        </ItalicParagraph>
        <Paragraph>
          <CMS.Text name="Contact paragraph" data={cmsData} />
        </Paragraph>
        <TextHeader2>API documentation</TextHeader2>
        <Routes>
          {Object.values(routes).map(route => (
            <ExploreDropdown
              key={route.route}
              label={
                <H2>
                  <Method>{route.method}</Method>
                  <Path>{route.route}</Path>
                  <RouteName>{route.name}</RouteName>
                </H2>
              }
            >
              <RouteContainer>
                <Paragraph>{route.description}</Paragraph>
                <H3>Direct download</H3>
                <StyledLink
                  href={route.route}
                >{`https://ampeid.org${route.route}`}</StyledLink>
                <H3>Example CURL</H3>
                <Example>
                  curl -X {route.method} {`https://ampeid.org${route.route}`}
                </Example>
                <H3>Schema explorer</H3>
                <SchemaSection>
                  <RenderChild name={route.schemaName} data={route.schema} />
                </SchemaSection>
                <H3>Abbreviated example response:</H3>
                <Example>
                  {route.name !== 'Download All Data' && '    '}
                  {route.example}
                </Example>
              </RouteContainer>
            </ExploreDropdown>
          ))}
        </Routes>
      </Main>
      <Footer />
    </Providers>
  )
}

export default APIPage
