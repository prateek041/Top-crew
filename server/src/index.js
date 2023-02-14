const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const typeDefs = require("./schema")
const resolvers = require("./resolvers/resolvers")

const app = express();

// Middleware to implement GraphQL
app.use("/gql", graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true
}))




app.listen("9091", ()=>{
  console.log("Server is listening on PORT 9091")
})