"use strict";
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;
// Définir le schéma pour les Freezbe
// Chaque Freezbe aura un nom, une description, un pUHT, une gamme, des ingrédients et un grammage
const FreezbeSchema = new Schema({
    nom: String,
    description: String,
    pUHT: Number,
    gamme: String,
    ingredients: String,
    grammage: String
});
// Créer le modèle Freezbe à partir du schéma défini
const Freezbe = mongoose.model('Freezbe', FreezbeSchema);
// Exporter le modèle Freezbe pour l'utiliser ailleurs dans l'application
module.exports = Freezbe;
