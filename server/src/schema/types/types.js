const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  fields: ()=>({
    id: { type: GraphQLID},
    name: { type: GraphQLString},
    phone: { type: GraphQLString},
    email: { type: GraphQLString},
    prodileId: {type: GraphQLString}
  })
})

module.exports = {
  UserType
}