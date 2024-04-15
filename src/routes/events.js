const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController")
const verifyLogin = require("../middleware/verifyLogin")

router.get("/", verifyLogin, eventController.getEvents);
router.post("/", verifyLogin,eventController.addEvents);
router.put("/:id", verifyLogin,eventController.updateEvent)
router.delete("/:id", verifyLogin,eventController.deleteEvent)

router.post("/:id/register", verifyLogin, eventController.registerEvent)

module.exports = router;
