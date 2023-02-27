const ProfilesCollection = require("../../models/Profiles")

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

const updateUserProfile = async (_, args) => {
  console.log("This was run");
  return "yes"
}

module.exports = {
  getAllUsersProfile,
  getUserProfile,
  newUserProfile
}