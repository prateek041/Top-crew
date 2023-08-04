# Server

This is a graphQL server built using graphQL Yoga.

## Get started with Dev setup

### To start the server

#### Install the dependencies

```shell
yarn or npm install
```

#### Configure the Dev Database

We will run MongoDB inside a docker container and configure our application to communicate with it.

```shell
docker run -d -p 27017:27017 --name mongo-dev mongo:latest
```

This command will pull the mongodb docker image from the official Docker Hub Registry if not already present on the system.

`-d` flag is used to run the container in detached mode, which in simple words means it Doesn't occupy you terminal and logs everything on it, instead it silently runs in the background.

`-p` flag is used to map the container PORT 27017 to the host PORT 27017 so that host port 27017 can be used to communicate.

#### Create the `.env` file

Create a file using the `touch` command, you can also use GUI too.

```shell
touch .env
```

Copy and paste the `env.example` file into the `.env` file you just created.

```shell
mv env.example .env
```

This will copy the content of env.example file into .env file. The application can run using these dafaule configurations.

For any modifications, change the values present in the `.env` file.

#### Start the Server

```shell
yarn dev or yarn run dev
```

This will run the server on PORT 9091 by default, which can be changed by changing the `PORT` variable in the `.env` file.

#### Open graphiQL to run Queries and Mutations

Open your browser and go to `http://localhost:9091`, you will come across something like this.

![Yoga](./docs/assets/yoga.png)

Click on `Visit GraphiQL` which is the Integrated Development Environment for GraphQL servers. 

![GraphiQL](./docs/assets/graphiql.png)

It helps in building the queries easier through the intellisense. It can be used to easily understand the capabilty of the server using the `Schema`.

### Understanding the Schema

It can be seen that there are two root types in the server, `query` and `mutation`. Let's dive deep.

#### Query

On clicking `query`, you can see there are two queries, namely `getAllUserProfile` and `getUserProfile`.

- getAllUserProfile: It does need any argument, on querying, it returns an array of `Profile`, which cannot be null and contains non null values, hence `[Profile!]!`.
- getUserProfile: It accepts a single argument, an `email`, which is of type `String` and returns a Profile, which can be null in case no user with that email exists.

*It is special because we have added auth, which you will understand later*

#### Mutation

On clicking `mutation`, you can see there are three mutations, namely `newUserSignUp` and `userLogin` and `updateUserProfile`.

- newUserSignUp: It accepts three arguments, a `name`, an `email` and a `password`, typically what is needed when a new user signs up. It returns a string, which is a message whether it was succesful or not.
- userLogin: It accepts two arguments, an `email` and a `password`, which will be used to login. When correct details are passed, a `JWT` is returned which can be saved and used again for auth from the frontend.
- updateUserProfile: It accepts the new information that will replace the current, or what new data needs to be added. It returns the updated profile.

Let's try a few queries

```gql
query{
  getAllUsersProfile{
    name
  }
}
```

Copy and paste the above mutation, then press the Play button. You will most likely get an empty array in return, this is because there are no users currently in the Database therefore the getAllUsersProfile query is returning an empty array. So, let's first create some users.

```gql
mutation{
  newUserSignUp(name: "MLH", email:"mlhisawesome@gmail.com", password:"1234")
}
```

We will be using a higly secure password here and an amazing username and email. Copy and paste it in the window and press the play button to run the query.

you should get this in return

```json
{
  "data": {
    "newUserSignUp": "User created succesfully"
  }
}
```

Yayy ! User was created succesfully.

Now since, the user is created let's run the getAllUsersProfile query again. Copy and Paste the above query again, let's see what we get.

You will get something like this

```json
{
  "data": {
    "getAllUsersProfile": [
      {
        "name": "MLH"
      }
    ]
  }
}
```

This time the array is not empty and contains an entry, which has a name field with value `MLH`, the same user we created.

### Understanding Auth

In the server, we have protected routes and unprotected routes, we are using graphql Shield for it. You can read more about it here [GraphQL Shield : Official Docs]().

Logically, routes that delete or update information should be protected, so let's try to get a single user's profile

```gql
{
  getUserProfile(email:"prateeksingh9741@gmail.com"){
    name
  }
}
```

to which the output should be something like this

```json
{
  "data": {
    "getUserProfile": {
      "name": "prateek"
    }
  }
}
```

Since these routes are not protected, anybody can open/read another person's profile. But when you try to delete someone's profile

```gql
mutation{
  deleteUser(email:"prateeksingh9741@gmail.com")
}
```

you will get something like this returned from the server.

```json
{
  "errors": [
    {
      "message": "Unexpected error.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteUser"
      ]
    }
  ],
  "data": {
    "deleteUser": null
  }
}
```

This is because the route is protected and the user needs to be authorised to delete any profile. In fact I have set it in a way that a user can only delete their profile.

#### How it is working

In the `/permissions` directory, you can see two files. `index.js` and `rules.js`. These two files will be governing auth for every route. Let's start with rules.js

Currently you can see a function named `isAuthenticated`, which will check if a user is authenticated to access a route or not. SIMPLE !!

The function takes out the token from the auth header, splits it at every " " and takes the second string as the token, why ? because the token being passed from the client looks something like this

`BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNjN2I4OTM0ZWEyMTRmN2E3ODMxMDQiLCJuYW1lIjoicHJhdGVlayIsImlhdCI6MTY5MTEyMzUwNCwiZXhwIjoxNjkxMTI3MTA0fQ.ouYvno7gNotvlZapyIlcFJHBNKkZhxQ_gflB3uhRePc`.

which is a JWT.

There are some utility functions used to verify if the token is signed properly and is correct, if all goes well, the user information is attached to the context which can be used in further request handling. So, when a user wants to delete their profile, they can only delete the profile attached to that specific Json Web Token.

It is EXTENSIBLE ! how ? further ahead, if I need more auth related functionalities, I can just attach a new function for it here. So if later I want to add admin role here, I can create a function `isAdmin` which will verify if the user loggin in is an admin or not, hence protecting adming routes.

#### How are the routes being protected ?

We have rules as I defined earlier, and then we have routes (the queries and the mutations), all we need to do now is to attach these rules to the routes. It is done in the index.js file, check it out

```javascript
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
    }
 }
```

There are two queries and four mutations, like our schema, with attributes like `not(isAuthenticated)` and `isAuthenticated`. This is where we connect rules to the routes. The file simply says that the queries will run even if the user is not authenticated and the mutations of updating and deleting a profile needs to be authenticated first.

`isAuthenticated` is checking for "True"ness for the function. If the function returns true, the route is accesible. Now, if enclose it in a not(), the results are reverserd. So, if a user is not authenticated, the function returns false, but not() inverts it hence returning true therefore giving access to the user accesing it.

The debug:true property helps in debugging because it logs out which route was being accessed and permission was not granted. therefore logs like these are generated.

```shell
ERR Error: Not Authorised!
    at normalizeOptions (/home/prateek/Desktop/Dev/js-builds/projects/Top-crew/server/node_modules/graphql-shield/cjs/shield.js:27:52)
    at shield (/home/prateek/Desktop/Dev/js-builds/projects/Top-crew/server/node_modules/graphql-shield/cjs/shield.js:40:31)
    at Object.<anonymous> (/home/prateek/Desktop/Dev/js-builds/projects/Top-crew/server/src/permissions/index.js:4:21)
    at Module._compile (node:internal/modules/cjs/loader:1256:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Module._load (node:internal/modules/cjs/loader:960:12)
    at Module.require (node:internal/modules/cjs/loader:1143:19)
    at require (node:internal/modules/cjs/helpers:110:18)
    at Object.<anonymous> (/home/prateek/Desktop/Dev/js-builds/projects/Top-crew/server/src/index.js:7:25) {
  path: [ 'updateUserProfile' ],
  locations: [ { line: 2, column: 3 } ],
  extensions: [Object: null prototype] {}
}
```

This error is generated when the user is not authorised to access a route.

So, now let's try to delete the user, for which we would have to login first and get the JWT.

To login, run the userLogin query, for example:

```gql
mutation{
  userLogin(email:"123@gmail.com" password:"1234")
}
```

running this query will return an JWT, which we will use to further authenticate our requests to the server.\

```json
{
  "data": {
    "userLogin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNjY2QwZWEwMjU5NDIzNWRiNjRhZWUiLCJuYW1lIjoicHJhdGVlayIsImlhdCI6MTY5MTE0NTIwMSwiZXhwIjoxNjkxMTQ4ODAxfQ.RrMABp_oSESbUqkjzZz50XXY8pe8e_D8Df5hBoNk9Vw"
  }
}
```

Now, let's use this JWT to delete the user.

```gql
mutation{
  deleteUser(email:"123@gmail.com")
}
```

and don't forget to attach the token in the hader, on the bottom left corner, grahpiQL provides a place to attach the JWT. for example, I am psting the JWT I got from the previous example login.

```json
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNjYzUxNzdlODE0YmQ4YjViYTNmMjIiLCJuYW1lIjoicHJhdGVlayIsImlhdCI6MTY5MTE0MjE5MiwiZXhwIjoxNjkxMTQ1NzkyfQ.J_SPQhM6Xs2CTgZunlAF_7np5kMG-ejk8XhsGx1MNhM"
}
```

this time we get an output like this

```json
{
  "data": {
    "deleteUser": "User deleted Succesfully"
  }
}
```
We succesfully deleted the user and their profile !