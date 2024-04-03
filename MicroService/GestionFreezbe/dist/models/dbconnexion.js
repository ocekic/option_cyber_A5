"use strict";
// @ts-ignore
const mongoose = require('mongoose');
// URL de la bdd mise à jour pour utiliser le nom du service Docker Compose pour MongoDB
mongoose.set('strictQuery', true);
// Connexion à la bdd avec le nom du service MongoDB spécifié dans docker-compose.yml
mongoose.connect("mongodb://localhost:27017/freezbes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// @ts-ignore
const db = mongoose.connection;
// Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});
