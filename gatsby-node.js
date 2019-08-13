exports.createSchemaCustomization = ({ actions }) => {
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
    }`
  ];
  createTypes(typeDefs);
};
