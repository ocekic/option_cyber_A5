// Importations nécessaires
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Configuration dotenv pour charger les variables d'environnement du fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware pour analyser le JSON
app.use(express.json());

app.use(cors());

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
