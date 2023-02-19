# A list of Good to Have features

- Rename the file name of users.js and passwords.js to user.js and profile.js.

This is how I will fetch user profile on signing in.

```javascript
  const retrievedUser = await UsersCollection.findOne({ email: 'prateeksingh9741@gmail.com' });
  const profile = await ProfilesCollection.findOne({_id: retrievedUser.profile})
  console.log(profile)
```

## Questions

- What to return in case of successfull login or signup.

## These are the todos

- User signup [x]
- User login []
- View all profiles [x]
- Fetch a single profile [x]
- Refactor the schema.js [x]
- better define the profile schema. []

## This is how the authorization process will look like

- When the user logs in, verify and generate the token in the backend.
- Send the token to the front-end, store it in cookies etc. now the client will attach it to all the requests it makes to the server.
- Now backend extracts the token from the req.header and checks if all is good.
- If all good, attach the user info into in req.user.

## Graphql Shield

It is simple process, define the rules and apply it to the schema.

we will build a simple application to test what is going on.

In the application that we are building, there are three permission state

- Non authenticated (not logged in)
- Authenticated and Grocer (a logged in user)
- Authenticated and customer (admin)

Now, we create a rules.js file which contains what roles are allowed and how to verify if they exist.

Next, we define a permissions/index.js file that uses the shield function to generate the shield using the rule model. we create the rule model using the roles we defined in rules.js
.

## Process from official docs

- shield function takes in the rules map, which matches the graphql schema.
- Rule map is created using the rule() function.
-
