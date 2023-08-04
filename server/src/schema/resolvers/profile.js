const ProfilesCollection = require('../../models/Profiles');
const UsersCollection = require('../../models/Users');

// return an array of user profiles
const getAllUsersProfile = async (_, args, context) => {
  const userList = await ProfilesCollection.find();
  return userList;
};

// return the user profile associated to the provided email
const getUserProfile = async (_, args) => {
  const user = await ProfilesCollection.findOne({ email: args.email });
  return user;
};

// create a basic user profile using the name and email.
const newUserProfile = async (userName, email) => {
  const NewUserProfile = new ProfilesCollection({
    name: userName,
    email: email,
  });
  await NewUserProfile.save();
  return NewUserProfile;
};

// Update the user profile depending on what was passed in the arguments.
const updateUserProfile = async (_, args, context) => {
  updatePayload = args.input;
  // TODO: There are two calls to the database here, something needs to be done about it.
  const user = await UsersCollection.findById(context.user.userId);
  // const profile = await ProfilesCollection.findById(user.profile) // find the user profile

  try {
    const updatedProfile = await ProfilesCollection.findByIdAndUpdate(
      user.profile,
      updatePayload,
      { new: true }
    );
    return updatedProfile;
  } catch (error) {
    return new Error('Unable to delete the profile', error);
  }
};

// Delete the user's profile.
const deleteUserProfile = async (email) => {
  const profile = await ProfilesCollection.findOne({ email: email });
  if (!profile) {
    throw new Error('Profile not found');
  }
  await ProfilesCollection.findOneAndDelete({ email: email });
  console.log('Profile deleted succesfully');
};

module.exports = {
  getAllUsersProfile,
  getUserProfile,
  newUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
