const ProfilesCollection = require("../models/Profiles")
const UsersCollection = require("../models/Users")
const {HashPass, VerifyPass} = require("../utils/hashingUtil")

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
    phone: { type: GraphQLString},
    email: { type: GraphQLString},
    prodileId: {type: GraphQLString}
  })
})

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
    GetAllUsers: {
      type: new GraphQLList(UserType),
      resolve: async(parents, args)=>{
        const userList = await ProfilesCollection.find()
        return userList;
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
      resolve: async(parent, args)=>{
        // check if the email is unique.
        const checkUserEmail = await UsersCollection.findOne({email: args.email});
        if (checkUserEmail != null) {
          throw new Error("Email already exists")
        }

        // If email isn't already used, save it.
        const HashedPass = await HashPass(args.password)

        // Create a new profile for the new user.
        const NewUserProfile = new ProfilesCollection({
          name: args.name,
          email: args.email,
        })
        await NewUserProfile.save();

        // Create a new user
        const NewUser = new UsersCollection({
          name: args.name,
          email: args.email,
          password: HashedPass,
          profile: NewUserProfile._id
        })

        await NewUser.save();

        // Maybe I should change this response
        return "User created succesfully"
      }
    }
  }
})   

// Creating the schema and exporting.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})