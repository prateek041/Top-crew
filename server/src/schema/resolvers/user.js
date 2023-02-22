const { HashPass } = require("../../utils/hashingUtil")
const UsersCollection = require("../../models/Users")
const ProfilesCollection = require("../../models/Profiles")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Signing up a new user.
const newUserSignUp = async (_, args) => {
  // check if the email is unique.
  const checkUserEmail = await UsersCollection.findOne({ email: args.email });
  if (checkUserEmail != null) {
    throw new Error("Email already exists")
  }

  // If email isn't already used, hash the password
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

  // Save in the database
  await NewUser.save();
  return "User created succesfully"
}

// User login:
const userLogin = async (_, args) => {
  const email = args.email
  const password = args.password

  // Verify if the email and password are corrct, if not, throw error.
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw new Error("User does not exist")
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("wrong Username or password")
  }

  // If no error, generate a JWT and send back.
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = {
  newUserSignUp,
  userLogin
}