const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const ContestType = require('./contest');
const data = require('../../data');

module.exports = new GraphQLObjectType({
  name: 'User',

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: subTree => [subTree.firstName, subTree.lastName].join(' ')
    },
    apiKey: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (subTree, args, context) => {
        const userId = subTree.id;
        return context.loaders.getContestsByUserIds.load(userId);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (subtree, args, context, { fieldName }) => {
        return data(context.mongoPool).getCountsByUserId(subtree.id, fieldName);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (subtree, args, context, { fieldName }) => {
        return data(context.mongoPool).getCountsByUserId(subtree.id, fieldName);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (subtree, args, context, { fieldName }) => {
        return data(context.mongoPool).getCountsByUserId(subtree.id, fieldName);
      }
    }
  }
});
