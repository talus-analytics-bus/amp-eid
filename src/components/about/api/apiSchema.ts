export enum SchemaObjectTypes {
  Object = 'object',
  Array = 'array',
  String = 'string',
}

const schema = {
  type: SchemaObjectTypes.Object as const,
  definition: 'All data',
  properties: {
    Topics: {
      type: SchemaObjectTypes.Array as const,
      definition: 'List of topics',
      items: {
        type: SchemaObjectTypes.Object as const,
        definition: 'Topic object',
        properties: {
          Name: {
            type: SchemaObjectTypes.String as const,
            definition: 'Name of the topic',
          },
          Method: {
            type: SchemaObjectTypes.String as const,
            definition: 'Method description of the topic',
          },
          Subtopics: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of subtopics',
            items: {
              type: SchemaObjectTypes.Object as const,
              definition: 'Subtopic object',
              properties: {
                Name: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Name of the subtopic',
                },
                Description: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Description of the subtopic',
                },
                Source: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Source annotation of the subtopic',
                },
                Statuses: {
                  type: SchemaObjectTypes.Array as const,
                  definition:
                    'Categories grouping each country relative to the subtopic',
                  items: {
                    type: SchemaObjectTypes.Object as const,
                    definition: 'Status object',
                    properties: {
                      Name: {
                        type: SchemaObjectTypes.String as const,
                        definition:
                          'Name of the status, the same as the key on the map',
                      },
                      Description: {
                        type: SchemaObjectTypes.String as const,
                        definition:
                          'Description of the status relative to the subtopic',
                      },
                      Countries: {
                        type: SchemaObjectTypes.Array as const,
                        definition: 'List of countries with the status',
                        items: {
                          type: SchemaObjectTypes.String as const,
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
      type: SchemaObjectTypes.Array as const,
      definition: 'List of countries with their treaties and documents',
      items: {
        type: SchemaObjectTypes.Object as const,
        definition: 'Country object',
        properties: {
          ISO3: {
            type: SchemaObjectTypes.String as const,
            definition: 'ISO3 code of the country',
          },
          Name: {
            type: SchemaObjectTypes.String as const,
            definition: 'Name of the country as displayed on the site',
          },
          Treaties: {
            type: SchemaObjectTypes.Array as const,
            definition:
              "List of treaties on the site with the country's status and key dates",
            items: {
              type: SchemaObjectTypes.Object as const,
              definition: 'Country-treaty object',
              properties: {
                Name: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Name of the treaty',
                },
                Status: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Status of the country relative to the treaty',
                },
                Date_signed: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Date the country signed the treaty',
                },
                Date_ratified: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Date the country ratified the treaty',
                },
                Date_entered_into_force: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Date the treaty entered into force',
                },
              },
            },
          },
          Documents: {
            type: SchemaObjectTypes.Object as const,
            definition: 'List of documents applicable to the country',
            properties: {
              Name: {
                type: SchemaObjectTypes.String as const,
                definition: 'Name of the document',
              },
              Type: {
                type: SchemaObjectTypes.String as const,
                definition:
                  'Type of document, one of "Treaty", "Law", "Regulation", "Supporting document", or "Other"',
              },
              Date_of_original_publication: {
                type: SchemaObjectTypes.String as const,
                definition: 'Date the document was originally published',
              },
              Relevant_articles: {
                type: SchemaObjectTypes.String as const,
                definition:
                  "Relevant document section or articles for determining the country's status in the appropriate topic",
              },
              Topics: {
                type: SchemaObjectTypes.Array as const,
                definition: 'List of topics where the document is relevant',
                items: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Name of the topic',
                },
              },
              Subtopics: {
                type: SchemaObjectTypes.Array as const,
                definition: 'List of subtopics where the document is relevant',
                items: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Name of the subtopic',
                },
              },
            },
          },
        },
      },
    },
    Treaties: {
      type: SchemaObjectTypes.Array as const,
      definition: 'List of treaties with their states parties and key dates',
      items: {
        type: SchemaObjectTypes.Object as const,
        definition: 'Treaty object',
        properties: {
          Name: {
            type: SchemaObjectTypes.String as const,
            definition: 'Name of the treaty',
          },
          Short_name: {
            type: SchemaObjectTypes.String as const,
            definition: 'Short name of the treaty, used in the URL and menus',
          },
          Description: {
            type: SchemaObjectTypes.String as const,
            definition: 'Description of the treaty',
          },
          Treaty_footnotes: {
            type: SchemaObjectTypes.String as const,
            definition:
              'Footnotes for the treaty, such as membership notes or process',
          },
          Date_of_original_publication: {
            type: SchemaObjectTypes.String as const,
            definition: 'Date the treaty was originally published',
          },
          Languages: {
            type: SchemaObjectTypes.Array as const,
            definition:
              'List of languages the treaty is available in on the site',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Language name of the treaty',
            },
          },
          Original_language_titles: {
            type: SchemaObjectTypes.Array as const,
            definition:
              'List of original language titles of the treaty, order matches the Languages array',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Title of the treaty in its original language,',
            },
          },
          Related_treaties: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of related treaties, if any',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Name of the related treaty',
            },
          },
          States_parties: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of states parties to the treaty',
            items: {
              type: SchemaObjectTypes.Object as const,
              definition: 'State party object',
              properties: {
                ISO3: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'ISO3 code of the country',
                },
                Name: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Name of the country',
                },
                Status: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Status of the country relative to the treaty',
                },
                Date_entered_into_force: {
                  type: SchemaObjectTypes.String as const,
                  definition:
                    'Date the treaty entered into force in the given country',
                },
                Date_ratified: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Date the country ratified the treaty',
                },
                Date_signed: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Date the country signed the treaty',
                },
                Reservations_understandings_and_declarations: {
                  type: SchemaObjectTypes.Array as const,
                  definition:
                    'Reservations, understandings and declarations, if any',
                  items: {
                    type: SchemaObjectTypes.String as const,
                    definition: 'Type of RUDs which apply to the country',
                  },
                },
                RUDs_text: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Text of the RUDs',
                },
              },
            },
          },
        },
      },
    },
    Documents: {
      type: SchemaObjectTypes.Array as const,
      definition: 'List of documents available on the site, excluding Treaties',
      items: {
        type: SchemaObjectTypes.Object as const,
        definition: 'Document object',
        properties: {
          Name: {
            type: SchemaObjectTypes.String as const,
            definition: 'Name of the document',
          },
          Subtitle: {
            type: SchemaObjectTypes.String as const,
            definition: 'Document subtitle',
          },
          Authoring_country: {
            type: SchemaObjectTypes.String as const,
            definition: 'Name of the country that authored the document',
          },
          Authoring_regional_organization: {
            type: SchemaObjectTypes.String as const,
            definition:
              'Name of the regional organization that authored the document, e.g. "European union"',
          },
          All_applicable_countries: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of all countries where the document applies',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'ISO3 of the country',
            },
          },
          Topics: {
            type: SchemaObjectTypes.Array as const,
            definition: 'Topics which reference this document',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Name of the topic',
            },
          },
          Subtopics: {
            type: SchemaObjectTypes.Array as const,
            definition: 'Subtopics which reference this document',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Name of the subtopic',
            },
          },
          Document_type: {
            type: SchemaObjectTypes.String as const,
            definition:
              'Type of document, one of "Treaty", "Law", "Regulation", "Supporting document", or "Other"',
          },
          Description: {
            type: SchemaObjectTypes.String as const,
            definition: 'Description of the document',
          },
          Date_of_original_publication: {
            type: SchemaObjectTypes.String as const,
            definition: 'Date the document was originally published',
          },
          Date_entered_into_force: {
            type: SchemaObjectTypes.String as const,
            definition: 'Date the document entered into force',
          },
          Languages: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of available languages',
            items: {
              type: SchemaObjectTypes.String as const,
              definition: 'Language name',
            },
          },
          Original_language_titles: {
            type: SchemaObjectTypes.Array as const,
            definition: 'Original language titles of the document',
            items: {
              type: SchemaObjectTypes.String as const,
              definition:
                'Original language title, order matches Languages array',
            },
          },
          Files: {
            type: SchemaObjectTypes.Array as const,
            definition: 'List of files available for download',
            items: {
              type: SchemaObjectTypes.Object as const,
              definition:
                'File object, order matches Languages and Original_language_titles arrays',
              properties: {
                publicURL: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'URL of the file, for download',
                },
                prettySize: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'Size of the file, in human readable format',
                },
                ext: {
                  type: SchemaObjectTypes.String as const,
                  definition: 'File extension',
                },
              },
            },
          },
        },
      },
    },
  },
}

export interface SchemaArray {
  type: SchemaObjectTypes.Array
  definition: string
  items: SchemaObject | SchemaArray | SchemaString
}

export interface SchemaObject {
  type: SchemaObjectTypes.Object
  definition: string
  properties: {
    [key: string]: SchemaObject | SchemaArray | SchemaString
  }
}

export interface SchemaString {
  type: SchemaObjectTypes.String
  definition: string
}

const routes = {
  all: {
    name: 'Download all data',
    method: 'GET',
    route: '/api/v1/',
    description:
      'Download all data in JSON format, organized by topics, countries, treaties, and documents. ',
    schemaName: 'All data',
    schema: schema,
    example: '',
  },
  topics: {
    name: 'Download all topics',
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
    name: 'Download all countries',
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
        "Files": [
          {
            "publicURL": "https://ampeid.org/static/7a45019257bcf36a6273abf3ec31d712/Hungary..pdf",
            "prettySize": "667 kB",
            "ext": ".pdf"
          },
          ...
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

export default routes
