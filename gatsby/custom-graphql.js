const moment = require('moment');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const {
  createMockTwitterSchema,
  createMockS3ImageSchema,
} = require('./mock-graphql');

function getSpeakerImageUrl(speakerNode) {
  return speakerNode.image
    ? speakerNode.image
    : speakerNode.github
    ? `https://github.com/${speakerNode.github}.png`
    : speakerNode.twitter
    ? `https://avatars.io/twitter/${speakerNode.twitter}/Large`
    : null;
}

function getMeetupInfo(source, _, context) {
  if (source.link) {
    const match = /\/(\d+)\/$/.exec(source.link);
    const eventId = match && Number(match[1]);
    return (
      context.nodeModel
        .getAllNodes({ type: 'EventYaml' })
        .find(event => event.meetup === eventId) || null
    );
  }
  return null;
}

function getMeetupVenue(source, _, context) {
  const info = getMeetupInfo(source, _, context);

  if (info) {
    return (
      context.nodeModel
        .getAllNodes({
          type: 'VenueYaml',
        })
        .find(venue => venue.id === info.venue) || null
    );
  }

  return null;
}

exports.createSchemaCustomization = function createSchemaCustomization({
  actions,
  schema,
  reporter,
}) {
  const { createTypes } = actions;
  let typeDefs = [
    `type EventYaml implements Node { 
      venue: VenueYaml @link 
      schedule: [EventYamlSchedule]
      instructor: [SpeakerYaml] @link
    }
    
    type EventYamlSchedule {
        talk: TalkYaml @link
    }
    `,
    `type TalkYaml implements Node {
        speaker: SpeakerYaml @link
    }`,
    schema.buildObjectType({
      name: 'TalkYaml',
      interfaces: ['Node'],
      fields: {
        event: {
          type: 'EventYaml',
          resolve: (source, _, context) => {
            return (
              context.nodeModel
                .getAllNodes({ type: 'EventYaml' })
                .find(
                  event =>
                    Array.isArray(event.schedule) &&
                    event.schedule.some(
                      sc => sc.type === 'talk' && sc.talk === source.id
                    )
                ) || null
            );
          },
        },
      },
    }),
    schema.buildObjectType({
      name: 'MeetupEvent',
      interfaces: ['Node'],
      fields: {
        isFull: {
          type: 'Boolean',
          resolve: source => {
            return source.rsvp_limit - source.yes_rsvp_count <= 0;
          },
        },
        isRsvpOpen: {
          type: 'Boolean',
          resolve: source => {
            return (
              !source.rsvp_rules.closed &&
              (!source.rsvp_rules.open_time ||
                source.rsvp_rules.open_time < new Date().getTime())
            );
          },
        },
        shouldClose: {
          type: 'Boolean',
          resolve: source => {
            // hard-code to should close if it is full and less than 3 days (unless found a way to get it from Meetup API)
            if (source.rsvp_limit - source.yes_rsvp_count > 0) {
              return false;
            }

            const now = moment(new Date());
            const eventDate = moment(new Date(source.time));

            return moment.duration(now.diff(eventDate)).asDays() > -3;
          },
        },
        dateTime: {
          type: 'Date',
          extensions: {
            dateformat: {},
          },
          resolve: source => new Date(source.time + source.utc_offset),
        },
        info: {
          type: 'EventYaml',
          resolve: getMeetupInfo,
        },
        isMeetup: {
          type: 'Boolean',
          resolve: (source, _, context) => {
            const info = getMeetupInfo(source, _, context);
            return !!info && info.type === 'meetup';
          },
        },
        venueName: {
          type: 'String',
          resolve: (source, _, context) => {
            const venue = getMeetupVenue(source, _, context);
            return (venue && venue.name) || (source.venue && source.venue.name);
          },
        },
        mapURL: {
          type: 'String',
          resolve: (source, _, context) => {
            const venue = getMeetupVenue(source, _, context);
            if (venue && venue.mapURL) {
              return venue.mapURL;
            }
            if (source.venue && source.venue.lon) {
              return `https://maps.google.com/?q=${source.venue.lat},${source.venue.lon}`;
            }
            return null;
          },
        },
        directions: {
          type: 'String',
          resolve: (source, _, context) => {
            const venue = getMeetupVenue(source, _, context);
            if (venue && venue.directions) {
              return venue.directions;
            }
            return null;
          },
        },
      },
    }),
    schema.buildObjectType({
      name: 'SpeakerYaml',
      interfaces: ['Node'],
      fields: {
        image: {
          type: 'String',
          resolve: getSpeakerImageUrl,
        },
        talk: {
          type: '[TalkYaml]',
          resolve: (source, _, context) => {
            return context.nodeModel
              .getAllNodes({ type: 'TalkYaml' })
              .filter(talk => talk.speaker === source.id);
          },
        },
        workshop: {
          type: '[EventYaml]',
          resolve: (source, _, context) => {
            return context.nodeModel
              .getAllNodes({ type: 'EventYaml' })
              .filter(
                event =>
                  Array.isArray(event.instructor) &&
                  event.instructor.includes(source.id)
              );
          },
        },
      },
    }),
    schema.buildObjectType({
      name: 'EventYaml',
      interfaces: ['Node'],
      fields: {
        meetup: {
          type: 'MeetupEvent',
          resolve: (source, _, context) => {
            return (
              context.nodeModel
                .getAllNodes({ type: 'MeetupEvent' })
                .find(meetup => {
                  if (!meetup.link) {
                    return false;
                  }
                  const match = /\/(\d+)\/$/.exec(meetup.link);
                  const eventId = match && Number(match[1]);
                  return eventId === source.meetup;
                }) || null
            );
          },
        },
        photos: {
          type: '[S3ImageAsset]',
          resolve: (source, _, context) => {
            return context.nodeModel
              .getAllNodes({ type: 'S3ImageAsset' })
              .filter(node => node.Key.split('_')[0] === source.id)
              .sort((nodeA, nodeB) => {
                if (nodeA.Key < nodeB.Key) {
                  return -1;
                }
                if (nodeA.Key > nodeB.Key) {
                  return 1;
                }
                return 0;
              });
          },
        },
        seoImagePublicUrl: {
          type: 'String',
          resolve: source => {
            return `/og_image/${source.id}.png`;
          },
        },
      },
    }),
    schema.buildObjectType({
      name: 'twitterFavoritesListReacttweets',
      interfaces: ['Node'],
      fields: {
        displayedText: {
          type: 'String',
          resolve: source => {
            const oriText =
              source.full_text &&
              source.full_text.replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            const indexOfTweetLink =
              oriText &&
              Math.max(
                oriText.lastIndexOf('https://t.co'),
                oriText.lastIndexOf('http://t.co')
              );

            return oriText && indexOfTweetLink > -1
              ? oriText.substring(0, indexOfTweetLink)
              : oriText;
          },
        },
        url: {
          type: 'String',
          resolve: source =>
            `https://twitter.com/${source.user.screen_name}/status/${source.id_str}`,
        },
      },
    }),
  ];

  if (!process.env.TWITTER_CONSUMER_KEY) {
    reporter.info(`Using mock twitter graphql schema`);
    typeDefs = typeDefs.concat(createMockTwitterSchema());
  }

  if (!process.env.AWS_ACCESS_KEY) {
    reporter.info(
      `AWS Access Key not available, using mock S3 image graphql schema`
    );
    typeDefs = typeDefs.concat(createMockS3ImageSchema());
  }

  createTypes(typeDefs);
};

exports.createResolvers = function createResolvers({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) {
  const { createNode } = actions;
  createResolvers({
    SpeakerYaml: {
      imageFile: {
        type: `File`,
        resolve(source) {
          const imageUrl = getSpeakerImageUrl(source);

          return (
            imageUrl &&
            createRemoteFileNode({
              url: imageUrl,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            })
          );
        },
      },
    },
  });
};
