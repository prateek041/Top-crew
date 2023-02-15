// This is the mongoose model to store the user information into the Database.

// I will be adding more fields like posts collection etc.
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('Users', UserSchema)