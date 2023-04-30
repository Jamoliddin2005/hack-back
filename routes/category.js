const router = require("express").Router();
const controll = require("../controller/category.js");
const FileUploader = require("../middleware/FileUploader.js");

router.post("/create", FileUploader.single("img"), controll.create);
router.post("/create/new/team/:id", controll.newCreateTeam);
router.post("/create/old/team/:id", controll.oldCreateTeam);
router.get("/", controll.find);
router.put("/update/name/:id", controll.updateName);
router.put("/update/team/:id/:teamId", controll.updateName);
router.delete("/delete/:id", controll.deleteCategory);
router.delete("/delete/:id/:teamId", controll.deleteTeam);

module.exports = router;
