const {shield, and, not} = require("graphql-shield");
const {isAuthenticated} = require('./rules');
const schema = require("../schema/schema")

const permissions = shield({
  query: {
    GetAllUsersProfile: not(isAuthenticated),
    GetUserProfile: isAuthenticated
  },
  mutation: {
    NewUserSignUp: not(isAuthenticated),
    UserLogin: not(isAuthenticated)
  },
  schema
})

module.exports = {permissions}