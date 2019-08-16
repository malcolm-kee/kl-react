const { createRemoteFileNode } = require('gatsby-source-filesystem');

function getSpeakerImageUrl(speakerNode) {
  return speakerNode.image
    ? speakerNode.image
    : speakerNode.github
    ? `https://github.com/${speakerNode.github}.png`
    : speakerNode.twitter
    ? `https://avatars.io/twitter/${speakerNode.twitter}/Large`
    : null;
}

exports.createSchemaCustomization = function createSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;
  const typeDefs = [
    `type EventYaml implements Node { 
      venue: VenueYaml @link 
      schedule: [EventYamlSchedule]
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
            return source.rsvp_limit - source.yes_rsvp_count === 0;
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
          resolve: (source, _, context) => {
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
          },
        },
        mapURL: {
          type: 'String',
          resolve: source => {
            if (source.venue && source.venue.lon) {
              return `https://maps.google.com/?q=${source.venue.lat},${
                source.venue.lon
              }`;
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
      },
    }),
    schema.buildObjectType({
      name: 'twitterFavoritesListReacttweets',
      interfaces: ['Node'],
      fields: {
        displayedText: {
          type: 'String',
          resolve: source => {
            const oriText = source.full_text;
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
            `https://twitter.com/${source.user.screen_name}/status/${
              source.id_str
            }`,
        },
      },
    }),
  ];
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
