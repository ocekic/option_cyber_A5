"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// connect to the db
const db = require("./models");
app.get('/', (req, res) => {
    res.json({ message: "User microservice" });
});
const UserRoutes = require('./routes/user.routes');
app.use("/users", UserRoutes);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
module.exports = app;