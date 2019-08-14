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
          resolve: source => {
            return source.image
              ? source.image
              : source.github
              ? `https://github.com/${source.github}.png`
              : source.twitter
              ? `https://avatars.io/twitter/${source.twitter}`
              : null;
          },
        },
      },
    }),
  ];
  createTypes(typeDefs);
};
