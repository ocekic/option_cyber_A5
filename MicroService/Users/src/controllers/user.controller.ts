// @ts-ignore
import User from '../models/user.model';
// @ts-ignore
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            password: bcrypt.hashSync(req.body.password, 8),
            nom: req.body.surname,
            prenom: req.body.name,
            username: req.body.username,
        });
        res.status(200).send({ message: "Utilisateur créé", utilisateur: user });
    } catch (err) {
        if (err.code === 11000) { 
            res.status(400).send({ erreur: "Une erreur est survenue durant l'enregistrement de l'utilisateur crée." });
        } else {
            res.status(500).send({ erreur: err.message });
        }
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ username: req.params.username }, {
            $set: {
                nom: req.body.name,
                prenom: req.body.surname,
                // Assurez-vous que la mise à jour du username est appropriée selon votre logique d'application
                // username: req.body.username,
            }
        }, { new: true });
        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            res.status(404).send({ message: "Utilisateur non trouvé" });
        }
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("Utilisateur non trouvé");
        }
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};


exports.searchForUsers = async (req, res) => {
    try {
        const users = await User.find({
            // Vous pouvez utiliser la syntaxe de requête MongoDB pour filtrer les utilisateurs
            // Exemple de recherche insensible à la casse pour 'nom'
            nom: { $regex: req.query.name, $options: 'i' },
            prenom: { $regex: req.query.surname, $options: 'i' },
            username: { $regex: req.query.email, $options: 'i' },
        });
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(404).send("Aucun utilisateur trouvé");
        }
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ username: req.params.username });
        if (deletedUser) {
            res.status(200).send({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).send("Utilisateur non trouvé");
        }
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};