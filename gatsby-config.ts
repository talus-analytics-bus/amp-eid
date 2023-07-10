import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://ampeid.org',
    title: 'Analysis and Mapping of Policies for Emerging Infectious Diseases.',
    cookieConsent: {
      cookieMessage:
        'Talus sites use cookies to ensure you get the best experience possible.',
      buttonColor: 'rgb(15, 35, 75)',
      backgroundColor: '#edf2f2',
    },
  },
  graphqlTypegen: true,
  plugins: [
    {
      // site will not build without a valid
      // airtable api key; delete this plugin
      // if airtable isn't going to be used.
      resolve: `gatsby-source-airtable`,
      options: {
        // eslint-disable-next-line
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          // CMS Tables
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Landing Page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Footer`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `About Overview`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `About Method`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Site metadata`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Glossary`,
            tableView: `CMS`,
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Icons`,
            tableView: `CMS`,
            mapping: { SVG: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `Data and API`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `About user guide`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          // Data Tables
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `LOOKUP: Country`,
            tableLinks: [
              `All_applicable_countries_link`,
              `Country_treaty_status_link`,
            ],
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `LOOKUP: Regional organization`,
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          // Documents table for pulling files
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Document library`,
            tableLinks: [
              `Document_topic_link`,
              `Document_subtopic_link`,
              `All_applicable_countries`,
              `Authoring_country`,
              `Authoring_regional_organization`,
              `Related_document`,
              `Treaty_status`,
            ],
            queryName: `Database`,
            separateNodeType: true,
            mapping: { PDF: `fileNode` },
            tableView: `CMS`,
          },
          // Documents table for thumbnails
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Document library`,
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Define status`,
            tableLinks: [`Define_status_assign_status_link`],
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Treaty status`,
            tableLinks: [`Country`, `Treaty_name`],
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Assign status`,
            tableLinks: [`Country`, `Status_link`],
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Subtopic`,
            tableLinks: [
              `Subtopic_topic_link`,
              `Subtopic_define_status_link`,
              `Subtopic_assign_status_link`,
            ],
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Topic`,
            tableLinks: [`Topic_subtopic_link`],
            mapping: { Image: `fileNode` },
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'AirtableDatabase',
        imagePath: 'data.PDF[].thumbnails.large.url',
        // ** ALL OPTIONAL BELOW HERE: **
        name: 'documentThumbnail',
        skipUndefinedUrls: true,
        prepareUrl: (url: string) => {
          if (!url || url === 'N/A') return undefined
          return url
        },
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'AirtableDatabase',
        imagePath: 'data.ISO2',
        // ** ALL OPTIONAL BELOW HERE: **
        name: 'flag',
        skipUndefinedUrls: true,
        prepareUrl: (url: string) => {
          if (!url || url === 'N/A') return undefined
          return `https://flags.talusanalytics.com/300px/${url.toLowerCase()}.png`
        },
      },
    },
    {
      // filling in the gtag here
      // will set up both the gatsby
      // google analytics plugin and
      // the cookieconsent opt-in system.
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-XXXXXXXXXX`,
        anonymize: true,
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allAirtableDatabase(filter: {table: {eq: "Document library"}}) {
              edges {
                node {
                  data {
                    PDF {
                      localFiles {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        resolvePages: (query: any) => {
          const allPages = query.allSitePage.nodes
          const allDocuments = query.allAirtableDatabase.edges
          const pages = allPages.map((page: { path: string }) => page.path)
          const siteUrl = query.site.siteMetadata.siteUrl
          const documents = allDocuments.map(
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            (doc: any) => doc.node.data?.PDF?.localFiles?.[0]?.publicURL
          )
          const urls = [...pages, ...documents].map((url: string) => ({
            path: `${siteUrl}${url}`,
            changeFreq: 'monthly',
            priority: 0.7,
          }))
          return urls
        },
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `ampeid.org`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'talus-gatsby-transformer-svg',
    'gatsby-plugin-styled-components',
    'talus-gatsby-transformer-svg',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-mdx',
  ],
}

export default config
