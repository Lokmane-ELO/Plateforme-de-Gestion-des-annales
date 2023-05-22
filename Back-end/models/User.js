const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma utilisateur
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true // ajoute des champs createdAt et updatedAt
});

module.exports = mongoose.model('User', UserSchema);