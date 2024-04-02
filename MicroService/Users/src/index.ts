const express = require('express');
import dotenv from 'dotenv';
import User from './models/user.model';
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 9000;

const cors = require('cors');
app.use(cors());

// connect to the db
const db = require("./models");

app.get('/', (req, res) => {
    res.json({ message: "User microservice" });
});

const UserRoutes = require('./routes/user.routes');
app.use("/users", UserRoutes);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
module.exports = app;