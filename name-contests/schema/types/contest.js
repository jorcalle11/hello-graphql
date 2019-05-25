'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql');

const ContestStatusType = require('./contestStatusType');

module.exports = new GraphQLObjectType({
  name: 'ContestType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    code: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: GraphQLNonNull(ContestStatusType) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    createdBy: { type: GraphQLNonNull(GraphQLString) }
  }
});
