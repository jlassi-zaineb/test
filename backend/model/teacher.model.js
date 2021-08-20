const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({

    classroom: String,
    teacher: String
})

module.exports = mongoose.model("Teacher", teacherSchema)