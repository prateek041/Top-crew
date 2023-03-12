const ProfilesCollection = require("../../models/Profiles")
const UsersCollection = require("../../models/Users")

// return an array of user profiles
const getAllUsersProfile = async (_, args, context) => {
  const userList = await ProfilesCollection.find()
  return userList;
}

// return the user profile associated to the provided email
const getUserProfile = async (_, args) => {
  const user = await ProfilesCollection.findOne({ email: args.email })
  return user;
}

// create a basic user profile using the name and email.
const newUserProfile = async (userName, email) => {
  const NewUserProfile = new ProfilesCollection({
    name: userName,
    email: email,
  })
  await NewUserProfile.save();
  return NewUserProfile;
}

// Update the user profile depending on what was passed in the arguments.
const updateUserProfile = async (_, args, context) => {
  updatePayload = args.input
  // TODO: There are two calls to the database here, something needs to be done about it.
  const user = await UsersCollection.findById(context.user.userId)
  // const profile = await ProfilesCollection.findById(user.profile) // find the user profile
  const updatedProfile = await ProfilesCollection.findByIdAndUpdate(user.profile, updatePayload, { new: true })
  return updatedProfile
}

module.exports = {
  getAllUsersProfile,
  getUserProfile,
  newUserProfile,
  updateUserProfile
}