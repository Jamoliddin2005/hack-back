const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model("admins", adminSchema)