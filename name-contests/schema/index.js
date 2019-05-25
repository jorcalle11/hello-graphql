'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

// the root query is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: `The **mandatory** hello world example`,
      resolve: () => 'world'
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
