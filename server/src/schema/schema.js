const Users = require("../models/Users")
const Passwords = require("../models/passwords")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: ()=>({
    id: { type: GraphQLID},
    name: { type: GraphQLString},
    email: { type: GraphQLString},
    password: {type: GraphQLString}
  })
})

// Password Type
const Password = new GraphQLObjectType({
  name: "password",
  fields: ()=>({
    UserID: {type: GraphQLID},
    password: {type: GraphQLString}
  })
})

// RootQuery type
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parents, args){
        // Users.find(); // Find all the users and return.
        return [
          {
            name: "Hello",
            email: "Hello@gmail.com",
          },
          {
            name: "world",
            email: "world@gmail.com",
          },
        ]
      }
    }
  }
})

// Mutations:
const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    // Register a new user.
    NewUserSignUp: {
      type: GraphQLString,
      args:{
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parent, args){
        // Here I will save the username, email and hashed pass into the password collection.
        const NewPassEntry = new Passwords({
          name: args.name,
          email: args.email,
          password: args.password
        })

        // will be add hashing of password tomorrow.

        NewPassEntry.save();

        return `These are your arguments ${args.name} ${args.email} ${args.password}`
        // Next I will also create a new User Type, with empty posts list etc. with the username, email and leaving other things blank.
      }
    }
  }
})   

// Creating the schema and exporting.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})