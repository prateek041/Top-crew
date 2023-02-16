const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profiles',
    required: true
  }
})

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
// check what to do if I keep them in seperate collections.