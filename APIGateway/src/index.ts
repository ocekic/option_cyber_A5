import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
const port = process.env.PORT || 7000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Api Gateway" });
});

const db = require('./models');

require('./routes/auth.routes')(app);
