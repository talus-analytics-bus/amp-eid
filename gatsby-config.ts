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
          // Master document library
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `LOOKUP: Country`,
            queryName: `Database`,
            separateNodeType: true,
            tableView: `CMS`,
          },
          // Documents table for pulling files
          {
            baseId: `appC6ldXKPoY3bIwz`,
            tableName: `Document library`,
            tableLinks: [`All_applicable_countries`, `Authoring_country`],
            queryName: `Database`,
            separateNodeType: true,
            mapping: { PDF: `fileNode` },
            tableView: `CMS`,
          },
          // Double-linking the documents table appears to
          // make thumbnail generation work consistenly
          // {
          //   baseId: `appC6ldXKPoY3bIwz`,
          //   tableName: `Document library`,
          //   queryName: `Documents`,
          //   separateNodeType: true,
          //   tableView: `CMS`,
          // },
          // // Trips
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `Define status`,
          //   tableView: `CMS`,
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `LOOKUP: Country (imported)`,
          //   tableLinks: [`All_applicable_countries_link`],
          //   tableView: `CMS`,
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `LOOKUP: Document (imported)`,
          //   tableLinks: [`Authoring_country`, `All_applicable_countries`],
          //   tableView: `CMS`,
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `LOOKUP: Document (imported)`,
          //   tableView: `CMS`,
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `Assign status`,
          //   tableLinks: [`Country`, `Status_link`],
          //   tableView: `CMS`,
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appryZVvEysrHZL0S`,
          //   tableName: `Subtopic`,
          //   tableView: `CMS`,
          //   tableLinks: [`Define_status`, `Assign_status`],
          //   queryName: `Trips`,
          //   separateNodeType: true,
          // },
          // // AMR Animal Health
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `Define status`,
          //   tableView: `CMS`,
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `LOOKUP: Country (imported)`,
          //   tableLinks: [`All_applicable_countries_link`],
          //   tableView: `CMS`,
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `LOOKUP: Document (imported)`,
          //   tableLinks: [`Authoring_country`, `All_applicable_countries`],
          //   tableView: `CMS`,
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `LOOKUP: Document (imported)`,
          //   tableView: `CMS`,
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `Assign status`,
          //   tableLinks: [`Country`, `Status_link`],
          //   tableView: `CMS`,
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `appONDwN3GkgWx0Vx`,
          //   tableName: `Subtopic`,
          //   tableView: `CMS`,
          //   tableLinks: [`Define_status`, `Assign_status`],
          //   queryName: `AmrAnimal`,
          //   separateNodeType: true,
          // },
          // // Treaties
          // {
          //   baseId: `app6WOQpwEJy3B88C`,
          //   tableName: `LOOKUP: Treaty`,
          //   tableView: `CMS`,
          //   queryName: `Treaties`,
          //   tableLinks: [`Country_link`, `Related_document`],
          //   mapping: { PDF: `fileNode` },
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `app6WOQpwEJy3B88C`,
          //   tableName: `LOOKUP: Treaty`,
          //   tableView: `CMS`,
          //   queryName: `Treaties`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `app6WOQpwEJy3B88C`,
          //   tableName: `LOOKUP: Country`,
          //   tableLinks: [`Treaty_link`],
          //   tableView: `CMS`,
          //   queryName: `Treaties`,
          //   separateNodeType: true,
          // },
          // {
          //   baseId: `app6WOQpwEJy3B88C`,
          //   tableName: `All treaties and countries`,
          //   tableLinks: [`Treaty_name`, `Country`],
          //   tableView: `CMS`,
          //   queryName: `Treaties`,
          //   separateNodeType: true,
          // },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableTrips',
    //     imagePath: 'data.ISO2',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'flag',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return `https://flags.talusanalytics.com/300px/${url.toLowerCase()}.png`
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableAmrAnimal',
    //     imagePath: 'data.ISO2',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'flag',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return `https://flags.talusanalytics.com/300px/${url.toLowerCase()}.png`
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableDocuments',
    //     imagePath: 'data.PDF[].thumbnails.large.url',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'documentThumbnail',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return url
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableTrips',
    //     imagePath: 'data.PDF[].thumbnails.large.url',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'documentThumbnail',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return url
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableAmrAnimal',
    //     imagePath: 'data.PDF[].thumbnails.large.url',
    //     // imagePath: 'data.PDF.raw[].thumbnails.large.url',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'documentThumbnail',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return url
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'AirtableTreaties',
    //     imagePath: 'data.PDF[].thumbnails.large.url',
    //     // imagePath: 'data.PDF.raw[].thumbnails.large.url',
    //     // ** ALL OPTIONAL BELOW HERE: **
    //     name: 'documentThumbnail',
    //     skipUndefinedUrls: true,
    //     prepareUrl: (url: string) => {
    //       if (!url || url === 'N/A') return undefined
    //       return url
    //     },
    //   },
    // },
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
