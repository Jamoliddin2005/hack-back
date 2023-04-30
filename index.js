const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const front = process.env.FRONT_URL || "http://localhost:3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: front,
    credentials: true,
  })
);

//routes
app.use("/", require("./routes/get.js"));
app.use("/api/admin", require("./routes/admin.js"));
// acces token middleware
app.use(require("./middleware/acces.js"));
// routes
app.use("/team", require("./routes/teams.js"));
app.use("/category", require("./routes/category.js"));
app.use("/list", require("./routes/list.js"));
app.use("/news", require("./routes/news.js"))
// error middlware
app.use(require("./middleware/error.js"));

const port = process.env.PORT || 5000;
const uri = process.env.URI || "mongodb://localhost:27017";
require("./helper/connect.js")(uri);
app.listen(port, () => {
  console.log("Server working on " + port);
});
