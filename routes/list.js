const router = require("express").Router()
const controll = require("../controller/list.js")

// router.post("/create", controll.create)
router.post("/create/team/:id", controll.createTeam)
router.get("/", controll.find)

module.exports = router