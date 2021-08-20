const mongoose = require('mongoose');

const dataStudentSchema = new mongoose.Schema({

    name: String, //le nom de l'enfant
    classRoom: String, //la classe de l'enfant
    gameTime: Date, //ici heure à extraire
    success: Number, // nombre de réussite
    nbClickBlackZone: Number, //nombre de clic sur zone noire
    nbClickYellowZone: Number, //nombre de clic sur zone jaune
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("DataStudent", dataStudentSchema)