const jwt = require('jsonwebtoken')
class AuthToken {
  static genereateToken(body){
    return jwt.sign({body}, process.env.JWT_TOKEN)
  }
}
module.exports = AuthToken;