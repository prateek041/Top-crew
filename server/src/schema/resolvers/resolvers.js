const { newUserSignUp, userLogin } = require("../resolvers/user")
const { getAllUsersProfile, getUserProfile } = require("../resolvers/profile")

const resolvers = {
  Query: {
    getAllUsersProfile: getAllUsersProfile,
    getUserProfile: getUserProfile
  },
  Mutation: {
    newUserSignUp: newUserSignUp,
    userLogin: userLogin
  }
}

module.exports = {
  resolvers
}