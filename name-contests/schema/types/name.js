'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql');

const data = require('../../data');

module.exports = new GraphQLObjectType({
  name: 'Name',

  fields: () => {
    const UserType = require('./user');

    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve: (subTree, args, context) => {
          return data(context.mysqlPool).getUserById(subTree.createdBy);
        }
      }
    };
  }
});
