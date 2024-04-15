const express = require('express')
const users = require('./src/routes/users')
const events = require("./src/routes/events");

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", users);
app.use("/events", events);


app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})
module.exports = app
// APIs

// /users
// register -> /users/register POST
// login -> /users/login POST

// /events
// CREATE -> /events POST
// UPDATE -> /events/:id POST
// REGISTER FOR EVENT -> /events/:id/register POST

// Async send emails after registration