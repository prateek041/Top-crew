const UsersCollection = require("../../models/Users")
const ProfilesCollection = require("../../models/Profiles")

const getAllUsersProfile = async () => {
  const userList = await ProfilesCollection.find()
  return userList;
}

const getUserProfile = async (_, args) => {
  const user = await UsersCollection.findOne({ email: args.email })
  return user;
}

module.exports = {
  getAllUsersProfile,
  getUserProfile
}