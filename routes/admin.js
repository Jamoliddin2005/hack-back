const router = require("express").Router();
const { auth } = require("../controller/admin.js");

router.post("/auth", auth);

module.exports = router;
