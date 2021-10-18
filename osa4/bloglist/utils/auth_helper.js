const jwt = require('jsonwebtoken');

const getToken = (req) => {
    const authtoken = req.get('authorization')
    if(authtoken && authtoken.toLowerCase().startsWith('bearer ')) {
      return authtoken.substring(7)
    }
    return null
}

module.exports = {
  getToken
}