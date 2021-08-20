const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Student", studentSchema)