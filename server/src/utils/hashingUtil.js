const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const saltCount = process.env.SaltRound;

const HashPass = async(password)=>{
  const hashedPass = await bcrypt.hash(password, 10); // Hashing the password
  return hashedPass;
}

const VerifyPass = async(password, savedPassword)=>{
  const match = await bcrypt.compare(password, savedPassword)
  return match;
}

const verifyToken = async(token)=>{
  const secret = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
} 

module.exports = { HashPass, VerifyPass, verifyToken }