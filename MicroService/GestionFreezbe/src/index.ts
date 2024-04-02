// @ts-ignore
import express from 'express';
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors());

// db connection
const db = require("./models/dbconnexion");

app.get('/', (req, res) => {
    res.json({ message: "Freezbe microservice" });
});

const FreezbeRoute = require("./routes/freezbe.routes");
app.use("/freezbe", FreezbeRoute);

app.listen(port, () => {
    return console.log(`Listening at http://localhost:${port}`);
});