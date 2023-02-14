const {buildSchema} = require('graphql')

// Creating schema definition

const typeDefs = buildSchema(`
  type Query {
    hello : String
  }
`)

module.exports = typeDefs;