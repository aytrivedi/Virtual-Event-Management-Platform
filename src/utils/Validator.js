 const bcrypt = require("bcrypt")
 class Validator {
   static validateRequestBody(body) {
     if (!body || !body.email || !body.password || !body.type) {
       return { status: false, message: "Missing Parameters" };
     }
     
     if (!Validator.validateEmail(body.email)) {
       return { status: false, message: "Invalid Email" };
     }
     if (body.type != "ADMIN" && body.type != "USER") {
       return { status: false, message: "Invalid Role of user" };
     }
     return { status: true };
   }
   static validateLoginRequest(body) {
     if (!body || !body.email || !body.password) {
       return { status: false, message: "Missing Parameters" };
     }
    
     if (!Validator.validateEmail(body.email)) {
       return { status: false, message: "Invalid Email" };
     }

     return { status: true };
   }
   static matchPassword(password, originalPassword) {
     return bcrypt.compareSync(password, originalPassword);
   }
   static validateNewEvent(body) {
     if (!body || !body.event_name || !body.venue || !body.date || !body.time) {
       return { status: false, message: "Invalid Request" };
     }
     return { status: true };
   }
   static validateParticipant(body) {
     if (!body || !body.email || !body.name || !body.contact) {
       return { status: false, message: "Bad Request" };
     }
     
     if (!Validator.validateEmail(body.email)) {
       return { status: false, message: "Invalid Email Format" };
     }
     if(body.contact.length != 10){
      return {status: false, message: "Invalid Contact No. Format"};
     }
     return { status: true };
   }

   static validateEmail(email){
    const emailRegexp =
       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
     return emailRegexp.test(email);
   }
 }
module.exports = Validator