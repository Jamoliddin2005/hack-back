const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  teams: [
    {
      teamId: {
        type: Schema.Types.ObjectId,
        ref: "teams",
      },
      matchCount: {
        type: Number,
        required: true,
        default: 0,
      },
      score: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

module.exports = model("lists", listSchema);
