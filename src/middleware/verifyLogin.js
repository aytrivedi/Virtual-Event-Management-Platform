const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyLogin = (req, res, next) =>{
  if(!req.headers.authorization){
    return res.status(401).json({ message: "Unauthorized" });
  }
    let token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
   let token_data =  jwt.verify(token, process.env.JWT_TOKEN);
   if(!token_data){
     return res.status(401).json({message : "Unauthorized"})
   }
   req.body.user_type = token_data.body.type
   req.body.user_email = token_data.body.user_email
   next()
}

module.exports = verifyLogin