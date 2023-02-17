// Collection of mutations
const {NewUserSignUp} = require('./mutation/User')
// collection of queries
const {GetAllUsersProfile, GetUserProfile} = require("../schema/query/query")

const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

// Password Type
// const PasswordType = new GraphQLObjectType({
//   name: "password",
//   fields: ()=>({
//     UserID: {type: GraphQLString},
//     name: {type: GraphQLString},
//     email: {type: GraphQLString},
//     password: {type: GraphQLString},
//   })
// })

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
  }
})   

// Creating the schema and exporting.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})