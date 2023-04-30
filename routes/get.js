const router = require("express").Router();
const category = require("../controller/category.js");
const list = require("../controller/list.js");
const { verifyToken } = require("../controller/admin.js");
const controll = require("../controller/news.js");

router.get("/categories", category.get);
router.get("/list", list.get);
router.get("/verify", verifyToken);
router.get("/news/all", controll.getNews);
router.get("/news/first", controll.getNewsFirst);
router.get("/news/:id", controll.getById);

module.exports = router;
