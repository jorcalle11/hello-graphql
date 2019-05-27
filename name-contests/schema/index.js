'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const MeType = require('./types/user');

// the root query is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: MeType,
      description: `The **current** user identified by an api key`,
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (subTree, args, context) => {
        return context.loaders.usersByKeys.load(args.key);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
