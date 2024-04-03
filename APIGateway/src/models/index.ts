"use strict";
// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();

mongoose.set('strictQuery', true);

// Connexion à la base de données des utilisateurs
const usersDb = mongoose.createConnection(process.env.DB_URI_USERS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connexion à la base de données freezbes
const freezbesDb = mongoose.createConnection(process.env.DB_URI_FREEZBE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Gestion des messages de connexion pour la base de données des utilisateurs
usersDb.on('error', console.error.bind(console, 'Erreur lors de la connexion à la base de données des utilisateurs'));
usersDb.once('open', function () {
    console.log("Connexion à la base de données des utilisateurs OK");
});

// Gestion des messages de connexion pour la base de données freezbes
freezbesDb.on('error', console.error.bind(console, 'Erreur lors de la connexion à la base de données freezbes'));
freezbesDb.once('open', function () {
    console.log("Connexion à la base de données freezbes OK");
});

// Exportez les connexions si vous devez les utiliser dans d'autres parties de votre application
module.exports = {
  usersDb,
  freezbesDb
};
