import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Assure-toi que tu as installé et configuré tes modèles de base de données et les routes correctement.
// Pour `db`, tu devrais avoir un fichier `dbconnexion.ts` qui exporte une fonction ou un objet pour la connexion.
// db connection
const db = require("./models/dbconnexion");
const FreezbeRoute = require("./routes/freezbe.routes");

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 8000;

// Configuration CORS pour permettre les requêtes de l'origine du front-end
app.use(cors({
    origin: 'http://localhost:3000', // Remplace avec l'origine réelle de ton front-end
    credentials: true, // Permet les requêtes avec des identifiants
  }));
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Freezbe microservice" });
});

app.use("/freezbe", FreezbeRoute);

app.listen(port, () => {
    console.log(`Freezbe microservice is running on port ${port}`);
});
