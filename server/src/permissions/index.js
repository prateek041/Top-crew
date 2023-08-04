const { shield, and, not } = require('graphql-shield');
const { isAuthenticated } = require('./rules');

const permissions = shield(
  {
    Query: {
      getAllUsersProfile: not(isAuthenticated),
      getUserProfile: not(isAuthenticated),
    },
    Mutation: {
      newUserSignUp: and(),
      userLogin: and(),
      updateUserProfile: isAuthenticated, // A person should be authenticated to update a user pofile
      deleteUser: isAuthenticated,
    },
  },
  {
    debug: true,
  }
);

module.exports = { permissions };
