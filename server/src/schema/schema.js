const fs = require('fs');
const { createSchema } = require('graphql-yoga');
const path = require("path");
const { resolvers } = require("./resolvers/resolvers") // bringing in resolvers.

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8") // reading the schema.

const schema = createSchema({
  typeDefs,
  resolvers,
}
)

module.exports = { schema }