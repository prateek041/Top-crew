const { newUserSignUp, userLogin } = require("../resolvers/user")
const { getAllUsersProfile, getUserProfile, updateUserProfile } = require("../resolvers/profile")

const resolvers = {
  Query: {
    getAllUsersProfile: getAllUsersProfile,
    getUserProfile: getUserProfile
  },
  Mutation: {
    newUserSignUp: newUserSignUp,
    userLogin: userLogin,
    updateUserProfile: updateUserProfile
  }
}

module.exports = {
  resolvers
}