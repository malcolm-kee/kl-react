const {
  createSchemaCustomization,
  createResolvers,
} = require('./gatsby/custom-graphql');
const { onCreateMdxNode, createMdxPages } = require('./gatsby/custom-mdx');
const { screenshot } = require('./gatsby/generate-image');

exports.onCreateNode = onCreateMdxNode;

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

  const [result] = await Promise.all([
    graphql(`
      {
        allEventYaml(filter: { type: { eq: "meetup" } }) {
          nodes {
            id
          }
        }
      }
    `),
    createMdxPages({ actions, graphql, reporter }),
  ]);

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

exports.onPostBuild = async ({ graphql, reporter }) => {
  reporter.info(`Start generating social media preview images`);

  const result = await graphql(`
    {
      allMeetupEvent(filter: { isMeetup: { eq: true } }) {
        nodes {
          name
          dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
          venueName
          info {
            id
            schedule {
              type
              talk {
                title
                speaker {
                  id
                  name
                  image
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return reporter.error(result.errors);
  }

  const events = result.data.allMeetupEvent.nodes.map(node => ({
    title: node.name,
    slug: node.info.id,
    dateTime: node.dateTime,
    venue: node.venueName,
    talks: node.info.schedule
      .filter(s => s.type === 'talk')
      .map(s => ({
        title: s.talk.title,
        speakerImage: s.talk.speaker.image,
        speakerName: s.talk.speaker.name,
      })),
    icon:
      'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
  }));

  try {
    await screenshot(
      {
        nodes: events,
        reporter,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'meetup.html'),
      }
    );
  } catch (e) {
    reporter.error(`caught error`);
    reporter.error(e);
  }
};
