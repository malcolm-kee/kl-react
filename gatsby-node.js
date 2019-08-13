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
        info: {
          type: 'EventYaml',
          resolve: (source, _, context) => {
            if (source.link) {
              const match = /\/(\d+)\/$/.exec(source.link);
              const eventId = match && Number(match[1]);
              return context.nodeModel
                .getAllNodes({ type: 'EventYaml' })
                .find(event => event.meetup === eventId);
            }
            return null;
          }
        }
      }
    })
  ];
  createTypes(typeDefs);
};
