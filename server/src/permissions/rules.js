const {rule} = require("graphql-shield")

const isAuthenticated = rule()(
  async (parent, args, context)=>{
    return true;
  }
)

module.exports = {isAuthenticated}