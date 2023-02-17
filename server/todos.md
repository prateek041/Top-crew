# A list of Good to Have features

- Rename the file name of users.js and passwords.js to user.js and profile.js.

This is how I will fetch user profile on signing in

```javascript
  const retrievedUser = await UsersCollection.findOne({ email: 'prateeksingh9741@gmail.com' });
  const profile = await ProfilesCollection.findOne({_id: retrievedUser.profile})
  console.log(profile)
```

## These are the todos

- User signup [x]
- User login []
- View all profiles [x]
- Fetch a single profile []
- Refactor the schema.js []
