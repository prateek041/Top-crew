const { createServer } = require("node:http") // server creater for node js
const { createYoga } = require("graphql-yoga")
const { schema } = require("./schema/schema")
const connectDB = require("./config/db")
require('dotenv').config()

const yoga = createYoga({ schema });
const server = createServer(yoga)

const startApp = async () => {
  // Connect to the database
  await connectDB();
  // Start the server
  server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
  })
}

startApp();