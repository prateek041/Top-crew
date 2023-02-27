const { createServer } = require("node:http") // server creater for node js
const { createYoga } = require("graphql-yoga")
const { schema } = require("./schema/schema")
const connectDB = require("./config/db")
const { headerExtracter } = require("./utils/authHeader")
const { applyMiddleware } = require("graphql-middleware")
const { permissions } = require("./permissions/index")
require('dotenv').config()

// Modify the schema to attach graphql Shield
const schemaWithAuth = applyMiddleware(schema, permissions);

const yoga = createYoga({ schema: schemaWithAuth, context: headerExtracter }); // attaching a function to extract header
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