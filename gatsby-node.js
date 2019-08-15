const {
  createSchemaCustomization,
  createResolvers,
} = require('./gatsby/custom-graphql');

exports.createSchemaCustomization = createSchemaCustomization;

exports.createResolvers = createResolvers;
