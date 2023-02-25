const { shield, and, not } = require("graphql-shield");
const { isAuthenticated } = require('./rules');

const permissions = shield({
  Query: {
    getAllUsersProfile: and(), // don't run anything here.
    getUserProfile: isAuthenticated // execute only if isAuthenticated returns true.
  },
  Mutation: {
    newUserSignUp: and(),
    userLogin: and()
  },
},
  {
    debug: true
  }
)

module.exports = { permissions }