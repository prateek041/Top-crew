const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')
const schema = require("./schema/schema")
const connectDB = require('./config/db')
require('dotenv').config()

const app = express();

// Middleware to implement GraphQL
app.use("/gql", graphqlHTTP({
  schema: schema,
  graphiql: true
}))

const startApp = async()=>{
  await connectDB();

  // Start the server
  app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
  })
}

startApp();