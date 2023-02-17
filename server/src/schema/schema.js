// Collection of mutations
const {NewUserSignUp, UserLogin} = require('./mutation/User')
// collection of queries
const {GetAllUsersProfile, GetUserProfile} = require("../schema/query/query")

const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

// RootQuery type
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // Get all the users profiles
    GetAllUsersProfile: GetAllUsersProfile,
    // Get a single user matching the email.
    GetUserProfile: GetUserProfile,
  }
})

// Mutations:
const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    // Register a new user.
    NewUserSignUp: NewUserSignUp,
    // User logs in and a JWT is returned.
    UserLogin: UserLogin,
  }
})   

// Creating the schema and exporting.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})