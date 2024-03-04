const { hashPass } = require('../../utils/hashingUtil');
const UsersCollection = require('../../models/Users');
const { newUserProfile } = require('./profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signing up a new user.
const newUserSignUp = async (_, args) => {
  // check if the email is unique.
  const checkUserEmail = await UsersCollection.findOne({ email: args.email });
  if (checkUserEmail != null) {
    throw new Error('Email already exists');
  }

  // If email isn't already used, hash the password
  const hashedPass = await hashPass(args.password);

  // Create a basic user profile as well.
  const newProfile = await newUserProfile(
    (userName = args.name),
    (email = args.email)
  );

  // Create a new user
  const newUser = new UsersCollection({
    name: args.name,
    email: args.email,
    password: hashedPass,
    profile: newProfile._id,
  });
  await newUser.save();
  return 'User created succesfully';
};

// User login:
const userLogin = async (_, args) => {
  const email = args.email;
  const password = args.password;

  // Verify if the email and password are corrct, if not, throw error.
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('wrong Username or password');
  }

  const payLoad = {
    userId: user.id,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // the token will expire in 60 mins.
  };

  // If no error, generate a JWT and send back.
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  });
  return token;
};

module.exports = {
  newUserSignUp,
  userLogin,
};
