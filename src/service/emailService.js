const nodemailer = require('nodemailer')
require("dotenv").config();


const confirmationEmail = (name, event, email) =>{

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: "Registration Confirmation For Event",
      text: 
    `Hey ${name} , 

    You have successfully registered for ${event.event_name}

    That will be start on ${event.date} at ${event.time}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        return {status: false, message:"some error occurred"}
        
    } else {
        console.log("Email sent:");
        return {status: true, message: "Successfully sent"}
    }
    })
}

module.exports = {confirmationEmail};