const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: String,
});

module.exports = model("news", newsSchema);
