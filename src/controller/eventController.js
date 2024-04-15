
const {v4 : uuidv4 } =  require('uuid')
const service = require('../service/emailService')
const Validator = require('../utils/Validator')
const Io = require('../utils/ReadWrite')

const EVENT_PATH = "./src/data/events.json"

const getEvents = (req, res) =>{
    let data = Io.read(EVENT_PATH)
    return res.status(200).json({data: data})
}
const addEvents = (req, res) =>{
    if(req.body.user_type === "USER"){
        return res.status(403).json({message: "Unauthorized access"})
    }
    delete req.body.user_type
    let validationStatus = Validator.validateNewEvent(req.body)
    if(validationStatus.status === false){
        return res.status(400).json({message: `${validationStatus.message}`})
    }
    let oldData = Io.read(EVENT_PATH)
    let newEvent = { ...req.body, eventId: uuidv4(), participants: [] };
    oldData.events.push(newEvent)
    Io.write(EVENT_PATH, oldData)
    return res.status(201).json({data: newEvent, message: "New Event Added Successfully"})
}

const deleteEvent = (req, res) =>{
    if (req.body.user_type === "USER") {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    let params = req.params.id
    if(!params){
        return res.status(404).json({message: "Bad Request"})
    }
    let eventData = Io.read(EVENT_PATH)
    let eventIndex = eventData.events.findIndex((event) => event.eventId === req.params.id)
    console.log(eventIndex)
    if(eventIndex === -1 || eventIndex === undefined){
        return res.status(404).json({message: "Event Not Found"})
    }
    eventData.events.splice(eventIndex, 1)
    Io.write(EVENT_PATH, eventData)
    return res.status(201).json({message: "Event Deleted Successfully"})
}

const updateEvent = (req, res) => {
    if (req.body.user_type === "USER") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    let validationStatus = Validator.validateNewEvent(req.body);
    if (validationStatus.status === false) {
      return res.status(400).json({ message: `${validationStatus.message}` });
    }
    let oldData = Io.read(EVENT_PATH);
    let eventIndex = oldData.events.findIndex((event) => event.eventId === req.params.id)
    if (eventIndex === -1 || eventIndex === undefined) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    let newEventDetails = {
        ...req.body, 
        eventId: req.params.id, 
        participants: oldData.events[eventIndex].participants}
    oldData.events[eventIndex] = { ...oldData.events[eventIndex], ...newEventDetails}
    Io.write(EVENT_PATH,oldData)
    return res.status(201).json({data: newEventDetails, message: "Event Updated Successfully"})
}

const registerEvent = async (req, res) =>{
    let eventData = Io.read(EVENT_PATH)
    let eventIndex = eventData.events.findIndex((event) => event.eventId === req.params.id)
    if(eventIndex === -1 || eventIndex === undefined){
        return res.status(404).json({message: "Event Not Found"})
    }
    const seats = eventData.events[eventIndex].seat
    let participantList = eventData.events[eventIndex].participants
    if(seats<=participantList.length){
        return res.status(201).json({status: "Failed", message: "All seats are full"})
    }
    let validateParticipant = Validator.validateParticipant(req.body);
    if(!validateParticipant.status){
        return res.status(400).json({message: `${validateParticipant.message}`})
    }
    participantList.push(req.body)
    eventData.events[eventIndex].participants = participantList
    Io.write(EVENT_PATH, eventData)
    var emailStatus = await service.confirmationEmail(
        req.body.name, eventData.events[eventIndex], req.body.email)
    res.status(201).json({message: "Registered Successfully"})
}

module.exports = {getEvents, addEvents, registerEvent, deleteEvent, updateEvent}