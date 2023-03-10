const { shield, and, not } = require("graphql-shield");
const { isAuthenticated } = require('./rules');

const permissions = shield({
  Query: {
    getAllUsersProfile: and(), // don't run anything here.
    getUserProfile: and() // execute only if isAuthenticated returns true.
  },
  Mutation: {
    newUserSignUp: and(),
    userLogin: and(),
    updateUserProfile: isAuthenticated // A person should be authenticated to update a user pofile
  },
},
  {
    debug: true
  }
)

module.exports = { permissions }