const { Schema, model } = require("mongoose");

const teamsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true, 
    }
})

module.exports = model("teams", teamsSchema)