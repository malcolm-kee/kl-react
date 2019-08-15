const { createRemoteFileNode } = require('gatsby-source-filesystem');

function getSpeakerImageUrl(speakerNode) {
  return speakerNode.image
    ? speakerNode.image
    : speakerNode.github
    ? `https://github.com/${speakerNode.github}.png`
    : speakerNode.twitter
    ? `https://avatars.io/twitter/${speakerNode.twitter}`
    : null;
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `type EventYaml implements Node { 
      venue: VenuesYaml @link 
      schedule: [EventYamlSchedule]
    }
    
    type EventYamlSchedule {
        talk: TalkYaml @link
    }
    `,
    `type TalkYaml implements Node {
        speaker: SpeakersYaml @link
    }`,
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
      name: 'SpeakersYaml',
      interfaces: ['Node'],
      fields: {
        image: {
          type: 'String',
          resolve: getSpeakerImageUrl,
        },
      },
    }),
  ];
  createTypes(typeDefs);
};

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    SpeakersYaml: {
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
