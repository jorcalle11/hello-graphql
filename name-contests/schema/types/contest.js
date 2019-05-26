'use strict';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require('graphql');

const data = require('../../data');

const ContestStatusType = require('./contestStatus');
const NameType = require('./name');

module.exports = new GraphQLObjectType({
  name: 'ContestType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    code: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: GraphQLNonNull(ContestStatusType) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    createdBy: { type: GraphQLNonNull(GraphQLString) },
    names: {
      type: new GraphQLList(NameType),
      resolve: (subTree, args, context) => {
        return data(context.mysqlPool).getNames(subTree.id);
      }
    }
  }
});
