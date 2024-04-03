"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Assure-toi que tu as installé et configuré tes modèles de base de données et les routes correctement.
// Pour `db`, tu devrais avoir un fichier `dbconnexion.ts` qui exporte une fonction ou un objet pour la connexion.
// db connection
const db = require("./models/dbconnexion");
const FreezbeRoute = require("./routes/freezbe.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 8000;
// Configuration CORS pour permettre les requêtes de l'origine du front-end
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Remplace avec l'origine réelle de ton front-end
    credentials: true, // Permet les requêtes avec des identifiants
}));
app.get('/', (req, res) => {
    res.json({ message: "Freezbe microservice" });
});
app.use("/freezbe", FreezbeRoute);
app.listen(port, () => {
    console.log(`Freezbe microservice is running on port ${port}`);
});
