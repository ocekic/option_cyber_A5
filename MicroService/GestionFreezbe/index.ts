import express, { Request, Response } from 'express';
import mongoose, { Document, Schema, Model } from 'mongoose';

const app = express();

// Connexion à MongoDB avec Mongoose
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true } as any)
    .then(() => {
        console.log('Connected successfully to MongoDB');
        // Ajout d'un délai avant de quitter le processus (à titre d'exemple)
        setTimeout(() => {
            console.log('Exiting the application...');
            process.exit(0); // 0 indique une sortie normale
        }, 2000); // Quitte après 2 secondes (2000 millisecondes)
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // 1 indique une sortie avec erreur
    });

// Définition d'un schéma de modèle
interface Example extends Document {
    name: string;
    age: number;
}

const exampleSchema = new Schema<Example>({
    name: String,
    age: Number
});

const ExampleModel: Model<Example> = mongoose.model('Example', exampleSchema);

// Route pour tester la connexion à MongoDB
app.get('/', async (req: Request, res: Response) => {
    try {
        const examples = await ExampleModel.find();
        res.send(examples);
    } catch (error) {
        res.status(500).send("Error querying MongoDB");
        console.error(error);
    }
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
