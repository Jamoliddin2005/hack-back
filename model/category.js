const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  oldOrNew: {
    type: String,
    required: true,
    enum: ["new", "old"],
  },
  teams: [
    {
      team1: {
        type: Schema.Types.ObjectId,
        ref: "teams",
      },
      team2: {
        type: Schema.Types.ObjectId,
        ref: "teams",
      },
      score1: {
        type: Number,
        required: true,
        default: 0,
      },
      score2: {
        type: Number,
        required: true,
        default: 0,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("categorys", categorySchema);
