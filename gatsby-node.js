const path = require('path');
const {
  createSchemaCustomization,
  createResolvers,
} = require('./gatsby/custom-graphql');
const { onCreateMdxNode, createMdxPages } = require('./gatsby/custom-mdx');
const { screenshot } = require('./gatsby/generate-image');

exports.onCreateNode = onCreateMdxNode;

exports.createSchemaCustomization = createSchemaCustomization;

exports.createResolvers = createResolvers;

const codelabTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'codelab-template.js'
);
const meetupTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'meetup-template.js'
);
const workshopTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'workshop-template.js'
);
const webcastTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'webcast-template.js'
);
const reactOnTwitterTemplate = path.resolve(
  __dirname,
  'src',
  'templates',
  'react-on-twitter-template.js'
);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const [result] = await Promise.all([
    graphql(`
      {
        allEventYaml {
          nodes {
            name
            type
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

  result.data.allEventYaml.nodes.forEach((event) => {
    createPage({
      path: `/event/${event.name}`,
      component:
        event.type === 'meetup'
          ? meetupTemplate
          : event.type === 'webcast'
          ? webcastTemplate
          : event.type === 'codelab'
          ? codelabTemplate
          : workshopTemplate,
      context: {
        name: event.name,
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

/**
 * @type {import('gatsby').GatsbyNode['onPostBuild']}
 */
exports.onPostBuild = async ({ graphql, reporter }) => {
  reporter.info(`Start generating social media preview images`);

  const result = await graphql(`
    {
      allMeetupEvent {
        nodes {
          name
          isMeetup
          dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
          venueName
          info {
            id
            name
            ogImage
            instructor {
              id
              name
              image
            }
            schedule {
              type
              talk {
                title
                speakers {
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

  const meetups = [];
  const meetupsWithCompactImage = [];
  const workshops = [];

  result.data.allMeetupEvent.nodes.forEach((node) => {
    if (node.info) {
      if (node.isMeetup) {
        const getMeetupBaseInfo = () => ({
          title: node.name.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
            ''
          ),
          // copied blindly 🤦‍♂️ from https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript/41543705#41543705
          slug: node.info.name,
          dateTime: node.dateTime,
          venue: node.venueName,
          icon: 'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
        });

        if (node.info.ogImage === 'compact') {
          const formatter = new Intl.ListFormat('en-US', {
            style: 'short',
            type: 'conjunction',
          });

          meetupsWithCompactImage.push({
            ...getMeetupBaseInfo(),
            talks: node.info.schedule
              .filter((s) => s.type === 'talk')
              .map(({ talk }) => {
                return {
                  title: talk.title,
                  speakerName: Array.isArray(talk.speakers)
                    ? formatter.format(talk.speakers.map((s) => s.name))
                    : 'TBD',
                  speakerImages: Array.isArray(talk.speakers)
                    ? talk.speakers.map((s) => s.image).filter(Boolean)
                    : undefined,
                };
              }),
          });
        } else {
          meetups.push({
            ...getMeetupBaseInfo(),
            talks: node.info.schedule
              .filter((s) => s.type === 'talk')
              .map((s) => {
                const speakerNameParts = Array.isArray(s.talk.speakers)
                  ? s.talk.speakers
                      .map((speaker) => speaker.name.split(' '))
                      .flat()
                  : [];

                const nameParts = speakerNameParts;
                const displayName =
                  nameParts.length > 2
                    ? nameParts
                        .map((part, i, allParts) =>
                          i === 0 || i === allParts.length - 1
                            ? part
                            : `${part[0]}.`
                        )
                        .join(' ')
                    : speakerNameParts.join(' ');

                return {
                  title: s.talk.title,
                  speakerImage: s.talk.speakers[0]?.image,
                  speakerName: displayName,
                };
              }),
          });
        }
      } else {
        workshops.push({
          title: node.name,
          slug: node.info.name,
          dateTime: node.dateTime,
          venue: node.venueName,
          instructors: node.info.instructor,
          icon: 'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
        });
      }
    }
  });

  try {
    const meetupScreenshotTask = screenshot(
      {
        nodes: meetups,
        reporter,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'meetup.html'),
      }
    );
    const meetupCompactScreenshotTask = screenshot(
      {
        nodes: meetupsWithCompactImage,
        reporter,
      },
      {
        template: path.resolve(
          __dirname,
          'og-image-template',
          'meetup-compact.html'
        ),
      }
    );
    const workshopScreenshotTask = screenshot(
      {
        nodes: workshops,
        reporter,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    );
    await Promise.all([
      meetupScreenshotTask,
      meetupCompactScreenshotTask,
      workshopScreenshotTask,
    ]);
  } catch (e) {
    reporter.error(`caught error`);
    reporter.error(e);
  }
};
