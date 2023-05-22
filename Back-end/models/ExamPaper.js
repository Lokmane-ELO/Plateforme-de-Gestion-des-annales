const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma d'annales d'examen
const ExamPaperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, {
    timestamps: true // ajoute des champs createdAt et updatedAt
});

module.exports = mongoose.model('ExamPaper', ExamPaperSchema);