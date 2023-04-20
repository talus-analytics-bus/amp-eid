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

const Paragraph = styled.p`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.black};
  max-width: 1000px;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
`
const H1 = styled.h1`
  ${({ theme }) => theme.h1}
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

const schema = {
  type: 'object',
  definition: 'All data',
  properties: {
    Topics: {
      type: 'array',
      definition: 'List of topics',
      items: {
        type: 'object',
        definition: 'Topic object',
        properties: {
          Name: {
            type: 'string',
            definition: 'Name of the topic',
          },
          Method: {
            type: 'string',
            definition: 'Method description of the topic',
          },
          Subtopics: {
            type: 'array',
            definition: 'List of subtopics',
            items: {
              type: 'object',
              definition: 'Subtopic object',
              properties: {
                Name: {
                  type: 'string',
                  definition: 'Name of the subtopic',
                },
                Description: {
                  type: 'string',
                  definition: 'Description of the subtopic',
                },
                Source: {
                  type: 'string',
                  definition: 'Source annotation of the subtopic',
                },
                Statuses: {
                  type: 'array',
                  definition:
                    'Categories grouping each country relative to the subtopic',
                  items: {
                    type: 'object',
                    definition: 'Status object',
                    properties: {
                      Name: {
                        type: 'string',
                        definition:
                          'Name of the status, the same as the key on the map',
                      },
                      Description: {
                        type: 'string',
                        definition:
                          'Description of the status relative to the subtopic',
                      },
                      Countries: {
                        type: 'array',
                        definition: 'List of countries with the status',
                        items: {
                          type: 'string',
                          definition: 'ISO3 code of the country',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    Countries: {
      type: 'array',
      definition: 'List of countries with their treaties and documents',
      items: {
        type: 'object',
        definition: 'Country object',
        properties: {
          ISO3: {
            type: 'string',
            definition: 'ISO3 code of the country',
          },
          Name: {
            type: 'string',
            definition: 'Name of the country as displayed on the site',
          },
          Treaties: {
            type: 'array',
            definition:
              "List of treaties on the site with the country's status and key dates",
            items: {
              type: 'object',
              definition: 'Country-treaty object',
              properties: {
                Name: {
                  type: 'string',
                  definition: 'Name of the treaty',
                },
                Status: {
                  type: 'string',
                  definition: 'Status of the country relative to the treaty',
                },
                Date_signed: {
                  type: 'string',
                  definition: 'Date the country signed the treaty',
                },
                Date_ratified: {
                  type: 'string',
                  definition: 'Date the country ratified the treaty',
                },
                Date_entered_into_force: {
                  type: 'string',
                  definition: 'Date the treaty entered into force',
                },
              },
            },
          },
          Documents: {
            type: 'object',
            definition: 'List of documents applicable to the country',
            properties: {
              Name: {
                type: 'string',
                definition: 'Name of the document',
              },
              Type: {
                type: 'string',
                definition:
                  'Type of document, one of "Treaty", "Law", "Regulation", "Supporting document", or "Other"',
              },
              Date_of_original_publication: {
                type: 'string',
                definition: 'Date the document was originally published',
              },
              Relevant_articles: {
                type: 'string',
                definition:
                  "Relevant document section or articles for determining the country's status in the appropriate topic",
              },
              Topics: {
                type: 'array',
                definition: 'List of topics where the document is relevant',
                items: {
                  type: 'string',
                  definition: 'Name of the topic',
                },
              },
              Subtopics: {
                type: 'array',
                definition: 'List of subtopics where the document is relevant',
                items: {
                  type: 'string',
                  definition: 'Name of the subtopic',
                },
              },
            },
          },
        },
      },
    },
    Treaties: {
      type: 'array',
      definition: 'List of treaties with their states parties and key dates',
      items: {
        type: 'object',
        definition: 'Treaty object',
        properties: {
          Name: {
            type: 'string',
            definition: 'Name of the treaty',
          },
          Short_name: {
            type: 'string',
            definition: 'Short name of the treaty, used in the URL and menus',
          },
          Description: {
            type: 'string',
            definition: 'Description of the treaty',
          },
          Treaty_footnotes: {
            type: 'string',
            definition:
              'Footnotes for the treaty, such as membership notes or process',
          },
          Date_of_original_publication: {
            type: 'string',
            definition: 'Date the treaty was originally published',
          },
          Languages: {
            type: 'array',
            definition:
              'List of languages the treaty is available in on the site',
            items: {
              type: 'string',
              definition: 'Language name of the treaty',
            },
          },
          Original_language_titles: {
            type: 'array',
            definition:
              'List of original language titles of the treaty, order matches the Languages array',
            items: {
              type: 'string',
            },
          },
          Related_treaties: {
            type: 'array',
            definition: 'List of related treaties, if any',
            items: {
              type: 'string',
            },
          },
          States_parties: {
            type: 'array',
            definition: 'List of states parties to the treaty',
            items: {
              type: 'object',
              definition: 'State party object',
              properties: {
                ISO3: {
                  type: 'string',
                  definition: 'ISO3 code of the country',
                },
                Name: {
                  type: 'string',
                  definition: 'Name of the country',
                },
                Status: {
                  type: 'string',
                  definition: 'Status of the country relative to the treaty',
                },
                Date_entered_into_force: {
                  type: 'string',
                  definition:
                    'Date the treaty entered into force in the given country',
                },
                Date_ratified: {
                  type: 'string',
                  definition: 'Date the country ratified the treaty',
                },
                Date_signed: {
                  type: 'string',
                  definition: 'Date the country signed the treaty',
                },
                Reservations_understandings_and_declarations: {
                  type: 'array',
                  definition:
                    'Reservations, understandings and declarations, if any',
                  items: {
                    type: 'string',
                    definition: 'Type of RUDs which apply to the country',
                  },
                },
                RUDs_text: {
                  type: 'string',
                  definition: 'Text of the RUDs',
                },
              },
            },
          },
        },
      },
    },
    Documents: {
      type: 'array',
      definition: 'List of documents available on the site, excluding Treaties',
      items: {
        type: 'object',
        definition: 'Document object',
        properties: {
          Name: {
            type: 'string',
            definition: 'Name of the document',
          },
          Subtitle: {
            type: 'string',
            definition: 'Document subtitle',
          },
          Authoring_country: {
            type: 'string',
            definition: 'Name of the country that authored the document',
          },
          Authoring_regional_organization: {
            type: 'string',
            definition:
              'Name of the regional organization that authored the document, e.g. "European union"',
          },
          All_applicable_countries: {
            type: 'array',
            definition: 'List of all countries where the document applies',
            items: {
              type: 'string',
              definition: 'ISO3 of the country',
            },
          },
          Topics: {
            type: 'array',
            definition: 'Topics which reference this document',
            items: {
              type: 'string',
              definition: 'Name of the topic',
            },
          },
          Subtopics: {
            type: 'array',
            definition: 'Subtopics which reference this document',
            items: {
              type: 'string',
              definition: 'Name of the subtopic',
            },
          },
          Document_type: {
            type: 'string',
            definition:
              'Type of document, one of "Treaty", "Law", "Regulation", "Supporting document", or "Other"',
          },
          Description: {
            type: 'string',
            definition: 'Description of the document',
          },
          Date_of_original_publication: {
            type: 'string',
            definition: 'Date the document was originally published',
          },
          Date_entered_into_force: {
            type: 'string',
            definition: 'Date the document entered into force',
          },
          Languages: {
            type: 'array',
            definition: 'List of available languages',
            items: {
              type: 'string',
              definition: 'Language name',
            },
          },
          Original_language_titles: {
            type: 'array',
            definition: 'Original language titles of the document',
            items: {
              type: 'string',
              definition:
                'Original language title, order matches Languages array',
            },
          },
        },
      },
    },
  },
}

interface SchemaArray {
  type: 'array'
  definition: string
  items: SchemaObject | SchemaArray | SchemaString
}

interface SchemaObject {
  type: 'object'
  definition: string
  properties: {
    [key: string]: SchemaObject | SchemaArray | SchemaString
  }
}

interface SchemaString {
  type: 'string'
  definition: string
}

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

const Name = styled.p`
  margin: 0;
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
    case 'array':
      return <RenderArray {...{ name, data }} />
    case 'object':
      return <RenderObject {...{ data }} />
    case 'string':
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

const routes = {
  all: {
    name: 'Download All Data',
    method: 'GET',
    route: '/api/v1/',
    description:
      'Download all data in JSON format, organized by topics, countries, treaties, and documents. ',
    schemaName: 'All data',
    schema: schema,
    example: '',
  },
  topics: {
    name: 'Download All Topics',
    method: 'GET',
    route: '/api/v1/topics',
    description:
      'Download all topics in JSON format, including all subtopics and all countries organized by status.',
    schemaName: 'Topics',
    schema: schema.properties.Topics,
    example: `[
      {
        "Name": "Trade and intellectual property",
        "Method": "In order to build a more complete picture...",
        "Subtopics": [
          {
            "Name": "World Trade Organization (WTO) member status",
            "Description": "The World Trade Organization...",
            "Source": "The World Trade Organization (WTO)...",
            "Statuses": [
              {
                "Name": "WTO Member",
                "Description": "Country is a member state...",
                "Countries": [
                  "AFG",
                  "ALB",
                  "AGO",
                  ...
                ]
              },
              {
                "Name": "WTO Observer",
                "Description": "Country is an observer...",
                "Countries": [
                  "DZA",
                  "AND",
                  "AZE",
                  ...
                ]
              },
              ...
            ]
          },
          ...
        ]
      },
      ...
    ]`,
  },
  countries: {
    name: 'Download All Countries',
    method: 'GET',
    route: '/api/v1/countries',
    description:
      'Download all countries in JSON format along with their status relative to each treaty and all applicable documents.',
    schemaName: 'Countries',
    schema: schema.properties.Countries,
    example: `[
      {
        "ISO3": "ZWE",
        "Name": "Zimbabwe",
        "Treaties": [
          {
            "Name": "Cartagena Protocol on Biosafety...",
            "Status": "Party",
            "Date_signed": "2000-05-24",
            "Date_ratified": "2005-02-25",
            "Date_entered_into_force": "2005-05-26"
          },
          ...
        ],
        "Documents": {
          "Name": "Patents Act (Chapter 26:03)",
          "Type": "Law",
          "Date_of_original_publication": "1972-02-01",
          "Relevant_articles": "Sections 30A-31",
          "Topics": [
            "Trade and intellectual property"
          ],
          "Subtopics": [
            "Compulsory licensing provision"
          ]
        }
      },
      ...
    ]`,
  },
  treaties: {
    name: 'Download all treaties',
    method: 'GET',
    route: '/api/v1/treaties',
    description:
      'Download all treaties in JSON format, including related treaties and states parties.',
    schemaName: 'Treaties',
    schema: schema.properties.Treaties,
    example: `[
      {
        "Name": "Agreement on Trade-Related Aspects of...",
        "Short_name": "TRIPS Agreement",
        "Description": "The Agreement on Trade-Related...",
        "Date_of_original_publication": "2005-12-06",
        "Languages": [
          "English",
          "French",
          ...
        ],
        "Original_language_titles": [
          "Agreement on Trade-Related Aspects of Intellectual...",
          "Accord sur les aspects des droits de propriété...",
          ...
        ],
        "Related_treaties": [
          "Marrakesh Agreement Establishing the World..."
        ],
        "States_parties": [
          {
            "ISO3": "AFG",
            "Name": "Afghanistan",
            "Status": "Party",
            "Date_entered_into_force": null,
            "Date_ratified": null,
            "Date_signed": null,
            "Reservations_understandings_and_declarations": null,
            "RUDs_text": null
          },
          ...
        ]
      },
      ...
    ]`,
  },
  documents: {
    name: 'Download all document metadata',
    method: 'GET',
    route: '/api/v1/documents',
    description:
      'Download all document metadata in JSON format including their authoring and applicable countries, key dates, and associated topics and subtopics.',
    schemaName: 'Documents',
    schema: schema.properties.Documents,
    example: ` [
      {
        "Name": "Act No. XXXIII of 1995 on the Protection of Inventions...",
        "Subtitle": "(Consolidated text of July 28, 2022)",
        "Authoring_country": "HUN",
        "Authoring_regional_organization": null,
        "All_applicable_countries": [
          "HUN"
        ],
        "Topics": [
          "Trade and intellectual property"
        ],
        "Subtopics": [
          "Compulsory licensing provision",
          "Pharmaceutical export provision"
        ],
        "Document_type": "Law",
        "Description": null,
        "Date_of_original_publication": "1995-04-25",
        "Date_entered_into_force": "1996-01-01",
        "Languages": [
          "English",
          "Hungarian"
        ],
        "Original_language_titles": [
          "Act No. XXXIII of 1995 on the Protection of...",
          "1995. évi XXXIII. törvény a találmányok szabadalmi..."
        ]
      },
      ...
    ]`,
  },
}

routes.all.example = `
  {
    "Topics": ${routes.topics.example},
    "Countries": ${routes.countries.example},
    "Treaties": ${routes.treaties.example},
    "Documents": ${routes.documents.example},
  }
`

const APIPage = (): JSX.Element => {
  return (
    <Providers>
      <CMS.SEO />
      <NavBar />
      <Main style={{ maxWidth: 1000 }}>
        <AboutNav />
        <H1>AMP EID API Documentation</H1>
        <Paragraph>
          The AMP EID API provides programattic access to the AMP EID data, both
          as a single JSON file and as individual routes for each section of the
          data.
        </Paragraph>
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
                <H3>Link</H3>
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
