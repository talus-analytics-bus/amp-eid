import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://example.talusanalytics.com/',
    title: 'Talus Analytics',
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
            tableName: `About Overview`,
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
            tableName: `Icons`,
            tableView: `CMS`,
            mapping: { SVG: `fileNode` },
          },
          {
            baseId: `appAUZi15WZodq9QW`,
            tableName: `About Download And Citations`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          // Data Tables
          // Trips
          {
            baseId: `appryZVvEysrHZL0S`,
            tableName: `3. Define status`,
            tableView: `CMS`,
            queryName: `Trips`,
            separateNodeType: true,
          },
          {
            baseId: `appryZVvEysrHZL0S`,
            tableName: `1. Subtopic`,
            tableView: `CMS`,
            tableLinks: [`Define_status`],
            queryName: `Trips`,
            separateNodeType: true,
          },
          // Treaties
          {
            baseId: `app6WOQpwEJy3B88C`,
            tableName: `LOOKUP: Treaty`,
            tableView: `CMS`,
            queryName: `Treaties`,
            tableLinks: [`Country_link`],
            mapping: { Attachments: `fileNode` },
            separateNodeType: true,
          },
          {
            baseId: `app6WOQpwEJy3B88C`,
            tableName: `LOOKUP: Country`,
            tableView: `CMS`,
            queryName: `Treaties`,
            separateNodeType: true,
          },
          {
            baseId: `app6WOQpwEJy3B88C`,
            tableName: `ALL: ONLY USE THIS TAB INSTEAD OF THE SINGLE TABS FROM NOW ON`,
            tableLinks: [`Treaty_name`, `Country`],
            tableView: `CMS`,
            queryName: `Treaties`,
            separateNodeType: true,
          },
        ],
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
