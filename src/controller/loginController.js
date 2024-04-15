const Validator = require("../utils/Validator");
const AuthToken = require("../utils/AuthToken");
require('dotenv').config()
const Io = require("../utils/ReadWrite")

const USER_PATH = "./src/data/users.json";
const loginController = (req, res) =>{
    let body = req.body
    let validationStatus = Validator.validateLoginRequest(body)
    if(!validationStatus.status){
        return res.status(400).json({message: `${validationStatus.message}`})
    }
    let data = Io.read(USER_PATH)
    let userIndex = data.users.findIndex(user => user.email===body.email)
    if(userIndex === undefined || userIndex === -1){
        return res.status(404).json({message: "User Not Found or Invalid Email"})
    }
    if(!Validator.matchPassword(body.password, data.users[userIndex].password)){
        return res.status(401).json({message: "Password Invalid"})
    }
    const token = AuthToken.genereateToken({email: body.email, type: data.users[userIndex].type});
    return res.status(200).json({token: token, message: "User Logged in Successfully"})
}

module.exports = loginController