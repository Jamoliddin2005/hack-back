const router = require("express").Router();
const controll = require("../controller/teams.js");
const FileUploader = require("../middleware/FileUploader.js");

router.post("/create", FileUploader.single("img"), controll.create);
router.put("/update/:id", FileUploader.single("img"), controll.update);
router.get("/", controll.find);
router.delete("/delete/:id", controll.delete);

module.exports = router;
