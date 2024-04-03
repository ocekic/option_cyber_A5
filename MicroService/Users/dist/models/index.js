"use strict";
// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI);
// @ts-ignore
const db = mongoose.connection;
//Message de connexion
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});
