// This function is used to extract the header from the requests and attach to the context object, so that it can be accessed by other resolvers.
const headerExtracter = async ({ request }) => {
  const token = request.headers.get("Authorization");
  if (token) {
    return { token: token } // this will seperately attach an attribute token to the context object.
  }
  return null
}

module.exports = {
  headerExtracter
}