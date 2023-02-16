const bcrypt = require('bcrypt');

const saltCount = process.env.SaltRound;

const HashPass = async(password)=>{
  const hashedPass = await bcrypt.hash(password, 10); // Hashing the password
  return hashedPass;
}

const VerifyPass = async(password, savedPassword)=>{
  const match = await bcrypt.compare(password, savedPassword)
  return match;
}

module.exports = { HashPass, VerifyPass }