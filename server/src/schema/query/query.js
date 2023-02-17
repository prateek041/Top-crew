const ProfilesCollection = require('../../models/Profiles')
const UsersCollection = require("../../models/Users")
const {GraphQLString} = require("graphql")

const {GraphQLList} =require("graphql")

const {UserType} = require("../types/types")

// Get all users
const GetAllUsersProfile = {
  type: new GraphQLList(UserType),
  resolve: async(parents, args)=>{
    const userList = await ProfilesCollection.find()
    return userList;
  }
}

// Get a single user depending on the email.
const GetUserProfile = {
  type: UserType,
  args:{
    email: {type: GraphQLString},
  },
  resolve: async(parents, args)=>{
    const user = await UsersCollection.findOne({email: args.email})
    return user
  }
}

module.exports = {
  GetAllUsersProfile,
  GetUserProfile
}