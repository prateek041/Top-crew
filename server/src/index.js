const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const typeDefs = require("./schema/schema")
const resolvers = require("./resolvers/resolvers")
const schema = require("./schema/schema")
const connectDB = require('./config/db')
require('dotenv').config()

const app = express();

// Connection to the database
connectDB();

// Middleware to implement GraphQL
app.use("/gql", graphqlHTTP({
  schema: schema,
  graphiql: true
}))




app.listen("9091", ()=>{
  console.log("Server is listening on PORT 9091")
})