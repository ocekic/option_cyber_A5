// @ts-ignore
const db = require("../models");
// @ts-ignore
const User = db.User;
// @ts-ignore
const dotenv = require("dotenv");
dotenv.config();
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const bcrypt = require("bcryptjs");
// @ts-ignore
const fetch = require("node-fetch");

exports.signin = async (req, res) => {
    try {
        // Remplacer par l'URL de ton microservice utilisateur
        const serviceUrl = 'http://127.0.0.1:3000/users/getUser/' + encodeURIComponent(req.body.username);

        const userServiceResponse = await fetch(serviceUrl, {
            method: 'GET', // Supposant que la méthode est GET pour récupérer l'utilisateur
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const user = await userServiceResponse.json();

        if (!userServiceResponse.ok) {
            return res.status(userServiceResponse.status).send("Utilisateur non trouvé");
        }

        // Vérifiez si le mot de passe est correct
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect."
            });
        }

        // Générez un token JWT si l'authentification est réussie
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 heures
        });

        // Envoyez la réponse avec les détails de l'utilisateur et le token JWT
        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ erreur: err.message });
    }
};


exports.signup = async (req, res) => {
    try {
        // Notez l'inversion des champs nom et prenom par rapport à votre exemple
        const user = new User({
            nom: req.body.name, // Correspond à 'name' dans le corps de la requête
            prenom: req.body.surname, // Correspond à 'surname' dans le corps de la requête
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8), // Hash du mot de passe
        });

        await user.save(); // Sauvegardez l'utilisateur dans la base de données

        // Excluez le mot de passe de la réponse pour des raisons de sécurité
        const { password, ...userInfo } = user._doc;

        res.status(200).send({
            message: "Utilisateur créé avec succès !",
            utilisateur: userInfo
        });
    } catch (err) {
        if (err.code === 11000) { 
            // Gestion spécifique des erreurs de duplication (contrainte unique violée)
            res.status(400).send({ erreur: "Le nom d'utilisateur est déjà utilisé." });
        } else {
            res.status(500).send({ erreur: "Une erreur est survenue durant l'enregistrement de l'utilisateur." });
        }
    }
};