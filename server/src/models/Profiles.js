// This is the mongoose model to store the user profile into the database.

// I will be adding more fields like posts collection etc.
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The entry should have a email Id"]
  },
  profileId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  bio:{
    type: String,
    maxLength: 50,
  },
  upForHiring:{
    type: Boolean,
  }
})

// model name is Users and collection name will be users.
const ProfileModel = mongoose.model('Profiles', ProfileSchema)
module.exports = ProfileModel;