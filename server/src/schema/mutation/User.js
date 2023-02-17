// this contains mutations for users.
const {GraphQLString} = require('graphql')
const {HashPass, VerifyPass} = require("../../utils/hashingUtil")
const UsersCollection = require("../../models/Users")
const ProfilesCollection = require("../../models/Profiles")

// bcrypt
const bcrypt = require("bcrypt")

// jsonwebtoken
const jwt = require("jsonwebtoken")

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

const UserLogin = {
  type: GraphQLString,
  args:{
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  resolve: async(parents, args)=>{
    const email = args.email
    const password = args.password

    // Verify if the email and password are corrct, if not, throw error.
    const user = await UsersCollection.findOne({email});
    if (!user){
      throw new Error("User does not exist")
    }
    if (! bcrypt.compareSync(password, user.password)){
      throw new Error("wrong Username or password")
    }

    // If no error, generate a JWT and send back.
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

    module.exports = {
      NewUserSignUp,
      UserLogin
    }