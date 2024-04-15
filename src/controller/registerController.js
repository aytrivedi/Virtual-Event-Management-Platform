const bcrypt = require("bcrypt");
const Validator = require("../utils/Validator");
const {v4 : uuidv4}  = require('uuid')
const Io = require("../utils/ReadWrite");

const USER_PATH = "./src/data/users.json";

const registerController = (req, res) =>{
    let requestBody = req.body;
    let validation = Validator.validateRequestBody(requestBody);
    if(validation.status === false){
        return res.status(400).json({message: `${validation.message}`})
    }
    let users = Io.read(USER_PATH)
    requestBody.password = bcrypt.hashSync(requestBody.password, 10);
    requestBody.id = uuidv4();
    users.users.push(requestBody)
    Io.write(USER_PATH, users)
    res.status(201).json({message:"User created successfully"})
}

module.exports = registerController