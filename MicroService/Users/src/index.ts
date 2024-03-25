import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "User microservice" });
});
