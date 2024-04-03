import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(cors()); // CORS devrait être en haut
app.use(express.json());


const db = require('./models');
require('./routes/auth.routes')(app);

// Importez et configurez vos routes et proxies ici
const { ROUTES } = require('./routes/routes');
const { setupProxies } = require('./middleware/proxy');
setupProxies(app, ROUTES);

// Route principale pour tester que l'API est opérationnelle
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "API Gateway" });
});

const port: string | number = process.env.PORT || 7000;

// Démarrage de l'API Gateway
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
