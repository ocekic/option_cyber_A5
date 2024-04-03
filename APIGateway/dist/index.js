"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // CORS devrait être en haut
app.use(express_1.default.json());
// Importez et configurez vos routes et proxies ici
const { ROUTES } = require('./routes/routes');
const { setupProxies } = require('./middleware/proxy');
setupProxies(app, ROUTES);
// Route principale pour tester que l'API est opérationnelle
app.get('/', (req, res) => {
    res.json({ message: "API Gateway" });
});
const port = process.env.PORT || 7000;
// Démarrage de l'API Gateway
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
