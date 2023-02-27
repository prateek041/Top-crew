const { rule } = require("graphql-shield")
const { verifyToken } = require("../utils/hashingUtil")

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, args, context) => {
    console.log("This function was run")
    const token = context.token?.split(" ")[1];
    if (token !== null) {
      const user = await verifyToken(token)
      // Fetch the user info and attach to context.
      if (user !== null) { // if the token is correct, attach info to the context.
        context.user = user;
        return true;
      }
      return false;
    }
    console.log("There was an error")
    return false; //
  }
)

module.exports = { isAuthenticated }