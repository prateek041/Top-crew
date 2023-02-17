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
