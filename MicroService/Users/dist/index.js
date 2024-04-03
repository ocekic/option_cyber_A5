"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importations nécessaires
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Configuration dotenv pour charger les variables d'environnement du fichier .env
dotenv_1.default.config();
// Création de l'application Express
const app = (0, express_1.default)();
// Middleware pour analyser le JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connexion à la base de données (exemple fictif, à remplacer par votre propre logique de connexion)
const db = require("./models");
// db.connect(); // Assurez-vous d'avoir une méthode de connexion ou une logique équivalente dans votre module `models`
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// Routes
const UserRoutes = require('./routes/user.routes');
app.use("/users", UserRoutes);
// Route de base pour vérifier que le microservice fonctionne
app.get('/', (req, res) => {
    res.json({ message: "User microservice is running" });
});
// Démarrage du serveur
const port = process.env.PORT || 9000; // Port par défaut ou spécifié via les variables d'environnement
app.listen(port, () => {
    console.log(`User microservice is listening on port ${port}`);
});
