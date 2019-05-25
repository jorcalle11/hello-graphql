const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');

const ContestType = require('./contest');
const data = require('../../data');

module.exports = new GraphQLObjectType({
  name: 'MeType',

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
        return data(context.mysqlPool).getContestsByUserId(userId);
      }
    }
  }
});
