const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const HashPass = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10); // Hashing the password
  return hashedPass;
}

const VerifyPass = async (password, savedPassword) => {
  const match = await bcrypt.compare(password, savedPassword)
  return match;
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

module.exports = { HashPass, VerifyPass, verifyToken }