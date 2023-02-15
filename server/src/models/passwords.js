const mongoose = require("mongoose")

const PasswordSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model("Password", PasswordSchema);