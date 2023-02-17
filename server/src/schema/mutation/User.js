// this contains mutations for users.
const {GraphQLString} = require('graphql')
const {HashPass, VerifyPass} = require("../../utils/hashingUtil")
const UsersCollection = require("../../models/Users")
const ProfilesCollection = require("../../models/Profiles")

const NewUserSignUp = {
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

    module.exports = {
      NewUserSignUp
    }