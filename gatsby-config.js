const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `KL React`,
    description: `Reacting in Kuala Lumpur, Malaysia`,
    url: `https://kl-react.com`,
    twitter: `@KlReact`,
    keywords: [`reactjs`, `react developer`, `kuala lumpur`, `meetup`],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/note-template.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        key: process.env.MEETUP_API_KEY,
        groupUrlName: 'kl-react',
        status: 'upcoming,past',
        desc: 'true',
      },
    },
    {
      resolve: `gatsby-source-twitter`,
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN,
        },
        queries: {
          reacttweets: {
            endpoint: 'favorites/list',
            params: {
              screen_name: 'KlReact',
              count: 50,
              tweet_mode: 'extended',
              include_ext_alt_text: true,
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: path.resolve(__dirname, 'og-image'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(__dirname, 'src', 'pages'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'src/data',
        name: 'data',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KL React`,
        short_name: `KL React`,
        background_color: `#33e`,
        theme_color: `#33e`,
        icon: `og-image/reactkl-logo-circle.png`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
};
