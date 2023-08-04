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

```gql
{
  "data": {
    "newUserSignUp": "User created succesfully"
  }
}
```

Yayy ! User was created succesfully.

Now since, the user is created let's run the getAllUsersProfile query again. Copy and Paste the above query again, let's see what we get.

You will get something like this

```gql
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

Logically, routes that delete or update profile related information should be protected, so let's try to get a single user's profile

```gql
{
  getUserProfile(email:"prateeksingh9741@gmail.com"){
    name
  }
}
```

to which the output should be something like this

```gql
{
  "data": {
    "getUserProfile": {
      "name": "prateek"
    }
  }
}
```

Since these routes are not protected, anybody can open/read another person's profile.

#### How it is working

In the `/permissions` directory, you can see two files. `index.js` and `rules.js`. These two files will be governing auth for every route. Let's start with rules.js

Currently you can see a function named `isAuthenticated`, which will check if a user is authenticated to access a route or not. SIMPLE !!

The function takes out the token from the auth header, splits it at every " " and takes the second string as the token, why ? because the token being passed from the client looks something like this

`BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNjN2I4OTM0ZWEyMTRmN2E3ODMxMDQiLCJuYW1lIjoicHJhdGVlayIsImlhdCI6MTY5MTEyMzUwNCwiZXhwIjoxNjkxMTI3MTA0fQ.ouYvno7gNotvlZapyIlcFJHBNKkZhxQ_gflB3uhRePc` 

which is a JWT.

There are some utility functions used to verify if the token is signed properly and is correct, if all goes well, the user information is attached to the context which can be used in further request handling.

It is EXTENSIBLE ! how ? further ahead, if I need more auth related functionalities, I can just attach a new function for it here. So if later I want to add admin role here, I can create a function `isAdmin` which will verify if the user loggin in is an admin or not, hence protecting adming routes.

#### How are the routes being protected ?

We have rules as I defined earlier, and then we have routes (the queries and the mutations), all we need to do now is at attach these rules to the routes. It is done in the index.js file, check it out

There are two queries and two mutations, like our schema, with attributes like `not(isAuthenticated)` and `isAuthenticated`. This is where we connect rules to the routes.

`isAuthenticated` is checking for "True"ness for the function. If the function returns true, the route is accesible. Now, if enclose it in a not(), the results are reverserd. So, if a user is not authenticated, the function returns false, but not() inverts it hence returning true therefore giving access to the user accesing it.