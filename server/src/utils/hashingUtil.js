const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const hashPass = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10); // Hashing the password
  return hashedPass;
}

const verifyToken = async (token) => { // try catch.
  try {
    const secret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secret); // This will return the unique id of the object
    return decodedToken;
  } catch (error) {
    return null;
  }
}

module.exports = { hashPass, verifyToken }