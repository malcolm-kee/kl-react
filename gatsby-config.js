require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `KL React Meetup`,
    description: `Reacting in Kuala Lumpur, Malaysia`,
    url: `https://kl-react.netlify.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-meetup`,
      options: {
        key: process.env.MEETUP_API_KEY,
        groupUrlName: 'kl-react',
        status: 'upcoming,past',
        desc: 'true',
      },
    },
    `gatsby-theme-notes`,
    `gatsby-theme-conference`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KL React`,
        short_name: `KL React`,
        background_color: `#33e`,
        theme_color: `#33e`,
        icon: `og-image/react_kl_icon.png`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
};
