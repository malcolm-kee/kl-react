const {
  createSchemaCustomization,
  createResolvers,
} = require('./gatsby/custom-graphql');

exports.createSchemaCustomization = createSchemaCustomization;

exports.createResolvers = createResolvers;

const path = require('path');
const meetupTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'meetup-template.js'
);
const reactOnTwitterTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'react-on-twitter-template.js'
);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allEventYaml(filter: { type: { eq: "meetup" } }) {
        nodes {
          id
        }
      }
    }
  `);

  if (result.errors) {
    reporter.error(result.errors);
    return;
  }

  const meetups = result.data.allEventYaml.nodes;

  meetups.forEach(meetup => {
    createPage({
      path: `/event/${meetup.id}`,
      component: meetupTemplate,
      context: {
        id: meetup.id,
      },
    });
  });

  if (process.env.TWITTER_CONSUMER_KEY) {
    reporter.info(
      `Detected twitter consumer key, /react-on-twitter page will be created`
    );
    createPage({
      path: `/react-on-twitter`,
      component: reactOnTwitterTemplate,
    });
  } else {
    reporter.info(
      `No twitter consumer key detected, /react-on-twitter page will not be created`
    );
  }
};
